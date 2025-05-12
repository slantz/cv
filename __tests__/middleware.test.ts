import { test, expect, describe } from "bun:test"
import { middleware, config } from "@/middleware"
import type { NextRequest } from "next/server"
import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server"

const nextConfig = {}

const createMockRequest = (path: string): NextRequest =>
  ({
    nextUrl: { pathname: path },
  } as unknown as NextRequest)

const testBlocked = async (path: string, expectedStatus: number, expectedBody: string) => {
  const req = createMockRequest(path)
  const res = middleware(req)
  expect(res).toBeDefined()
  expect(res?.status).toBe(expectedStatus)

  const reader = res?.body?.getReader()
  const { value } = await reader?.read()!
  const text = new TextDecoder().decode(value)

  expect(text).toBe(expectedBody)
}

describe("Middleware matcher behavior", () => {
  test("matches general paths and not excluded ones", () => {
    expect(
      unstable_doesMiddlewareMatch({ config, nextConfig, url: "/about" })
    ).toBe(true)

    expect(
      unstable_doesMiddlewareMatch({ config, nextConfig, url: "/favicon.ico" })
    ).toBe(false)

    expect(
      unstable_doesMiddlewareMatch({ config, nextConfig, url: "/robots.txt" })
    ).toBe(false)

    expect(
      unstable_doesMiddlewareMatch({
        config,
        nextConfig,
        url: "/_next/static/chunks/webpack-ab48ec70620e68f8.js",
      })
    ).toBe(false)
  })
})

describe("Blocked bot paths", () => {
  test("wp- paths are blocked with 451", () => {
    testBlocked("/wp-login.php", 451, "Nope.")
    testBlocked("/wp-admin", 451, "Nope.")
  })

  test("non-wp aggressive bot paths blocked with 418", () => {
    testBlocked("/phpmyadmin", 418, "🫖")
    testBlocked("/.env", 418, "🫖")
    testBlocked("/2021", 418, "🫖")
    testBlocked("/mail", 418, "🫖")
  })

  test("path matching is case-insensitive", () => {
    testBlocked("/Wp-Login.Php", 451, "Nope.")
    testBlocked("/MAIL", 418, "🫖")
  })

  test("normal paths pass through", () => {
    const res = middleware(createMockRequest("/about"))
    expect(res?.status).toBe(200)
  })

  test("blocks paths ending with known dangerous extensions", async () => {
    await testBlocked("/backup.bak", 418, "🫖")
    await testBlocked("/dump.sql", 418, "🫖")
    await testBlocked("/config.old", 418, "🫖")
    await testBlocked("/env.ini", 418, "🫖")
    await testBlocked("/php.cfg", 418, "🫖")
    await testBlocked("/error.log", 418, "🫖")
    await testBlocked("/wlwmanifest.xml", 418, "🫖")
    await testBlocked("/license.txt", 418, "🫖")

    const res = middleware(createMockRequest("/seo_1200x630.webp"))
    expect(res?.status).toBe(200)
  })
})
