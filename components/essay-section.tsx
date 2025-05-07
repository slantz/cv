"use client"

import {AlertCircle, ChevronDown, ChevronUp, Info} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {useCvData} from "@/hooks/use-cv-data";
import {useState} from "react";
import {event} from "@/lib/analytics";
import {CVData} from "@/types/core";
import {formatSubtitle, parseTextWithLinks, renderDescription} from "@/lib/render-utils"

interface EssaySectionProps {
  data: Omit<CVData, 'about'>;
}

export function EssaySection({data}: EssaySectionProps) {
  const { cvData, isLoading, error, usingMockData } = useCvData()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)

    // Track section expansion as an event
    if (expandedId !== id) {
      event({
        action: "expand_section",
        category: "user_interaction",
        label: id,
      })
    }
  }

  return (
    <>
      {usingMockData && (
        <div className="max-w-5xl mx-auto mb-6">
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3 flex items-center gap-3">
            <Info className="h-5 w-5 text-yellow-400 flex-shrink-0" />
            <p className="text-sm text-yellow-200">
              Firebase connection unavailable. Displaying mock data instead. Please check your Firebase configuration.
            </p>
          </div>
        </div>
      )}
      <section className="max-w-5xl mx-auto grid gap-6">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-pulse flex space-x-4">
              <div className="h-3 w-3 bg-purple-400 rounded-full"></div>
              <div className="h-3 w-3 bg-pink-400 rounded-full"></div>
              <div className="h-3 w-3 bg-cyan-400 rounded-full"></div>
            </div>
          </div>
        ) : error && !usingMockData ? (
          <div className="rounded-xl overflow-hidden border border-red-500/50 bg-red-950/10 p-6 text-center">
            <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-red-400 mb-1">Error Loading Data</h3>
            <p className="text-gray-300">{error}</p>
            <p className="text-gray-400 text-sm mt-2">
              Please check your Firebase configuration and ensure your collections are set up correctly.
            </p>
          </div>
        ) : cvData.length === 0 ? (
          <div className="rounded-xl overflow-hidden border border-yellow-500/50 bg-yellow-950/10 p-6 text-center">
            <AlertCircle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-yellow-400 mb-1">No Data Found</h3>
            <p className="text-gray-300">No CV sections were found in your Firebase database.</p>
            <p className="text-gray-400 text-sm mt-2">
              Please add some data to your 'cv-sections' collection in Firebase.
            </p>
          </div>
        ) : (
          cvData.map((section, index) => (
            <motion.div
              key={section.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-xl overflow-hidden border border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all duration-300 hover:-translate-y-1"
            >
              <motion.button
                layout
                onClick={() => toggleExpand(section.id)}
                className="w-full p-6 flex justify-between items-center text-left"
              >
                <div>
                  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    {section.title}
                  </h3>
                  <p className="text-gray-300 mt-1">{section.description}</p>
                </div>
                {expandedId === section.id ? (
                  <ChevronUp className="h-5 w-5 text-purple-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-purple-400" />
                )}
              </motion.button>

              <AnimatePresence>
                {expandedId === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-gray-700"
                  >
                    <div className="p-6 bg-gray-800/80">
                      {section.details.length > 0 ? (
                        section.details.map((detail, index) => (
                          <div key={index} className="mb-4 last:mb-0">
                            <div className="flex justify-between items-center">
                              <div className="flex-1">
                                <h4 className="font-semibold text-cyan-400">
                                  {detail.title}
                                  {detail.subtitle && (
                                    <span className="font-normal text-gray-300 ml-1">
                                        , {formatSubtitle(detail.subtitle)}
                                      </span>
                                  )}
                                </h4>
                              </div>
                              {detail.dateRange && (
                                <span className="text-xs text-gray-400 font-medium ml-2">{detail.dateRange}</span>
                              )}
                            </div>
                            {renderDescription(detail.description)}
                            {detail.tags && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {detail.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
                                  >
                                      {tag}
                                    </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-center italic">No details available for this section.</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </section>
    </>
  );
}
