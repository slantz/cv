"use client"

import {AlertCircle, ChevronDown, ChevronUp, Info} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useMemo, useState} from "react";
import {event} from "@/lib/analytics";
import {CVData, EssaySection as EssaySectionType} from "@/types/core";
import {EssayHeading} from "@/components/essay/essay-heading";
import {EssayDescription} from "@/components/essay/essay-description";
import {EssayLinks} from "@/components/essay/essay-links";
import {EssayKeyProjects} from "@/components/essay/essay-key-projects";

interface EssaySectionProps {
  data: Omit<CVData, 'about'>;
}

export function EssaySection({data}: EssaySectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [partiallyMocked, setPartiallyMocked] = useState<Array<string>>([]);
  const [isPartiallyMocked, setIsPartiallyMocked] = useState(false);
  const [isFullyMockedData, setIsFullyMockedData] = useState(false);

  const sortedSections = useMemo(() =>
    Object.entries(data)
      .sort(
        ([, a], [, b]) => a.meta.order - b.meta.order
      ),
    [data]
  );

  const sortSectionsContent = (data: Array<EssaySectionType>) => data.sort((a, b) => a.order && b.order ? a.order - b.order : 0);

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

  useEffect(() => {
    const sections = Object.values(data);

    const isPartialMock = sections.some(
      (section) => section.meta.subtitle === "mock"
    );

    const isFullMock = sections.every(
      (section) => section.meta.subtitle === "mock"
    );

    if (isPartialMock && !isFullMock) {
      setPartiallyMocked(sections.reduce<string[]>((acc, cur) => {
        if (cur.meta.subtitle === "mock") {
          acc.push(cur.meta.title);
        }
        return acc;
      }, []));
    }

    setIsPartiallyMocked(!isFullMock && isPartialMock);
    setIsFullyMockedData(isFullMock);
  }, [data]);

  return (
    <>
      {isPartiallyMocked && (
        <div className="max-w-5xl mx-auto mb-6">
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3 flex items-center gap-3">
            <Info className="h-5 w-5 text-yellow-400 flex-shrink-0" />
            <p className="text-sm text-yellow-200">
              Something is wrong with fetching CV data, but only some sections appear to be broken: [{partiallyMocked}], the rest are fine.
              Do not hesitate to ping Alex.
            </p>
          </div>
        </div>
      )}
      <section className="max-w-5xl mx-auto grid gap-6">
        {isFullyMockedData ? (
          <div className="rounded-xl overflow-hidden border border-red-500/50 bg-red-950/10 p-6 text-center">
            <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-red-400 mb-1">Error Loading Data</h3>
            <p className="text-gray-300">Seems like we use full mock for all the sections.</p>
            <p className="text-gray-400 text-sm mt-2">
              Please ping Alex to check the Firebase configuration / database and ensure the collections are set up correctly or connection to firebase is up.
            </p>
          </div>
        ) : sortedSections.length === 0 ? (
          <div className="rounded-xl overflow-hidden border border-yellow-500/50 bg-yellow-950/10 p-6 text-center">
            <AlertCircle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-yellow-400 mb-1">No Data Found</h3>
            <p className="text-gray-300">No CV sections were found in database.</p>
            <p className="text-gray-400 text-sm mt-2">
              Please ask Alex to add some data to Database, I really have no idea how this is possible, no mock fallback, no data at all, better ping him.
            </p>
          </div>
        ) : (
          sortedSections.map(([sectionKey, section], index) => (
            <motion.div
              key={sectionKey}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-xl overflow-hidden border border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all duration-300 hover:-translate-y-1"
            >
              <motion.button
                layout
                onClick={() => toggleExpand(sectionKey)}
                className="w-full p-6 flex justify-between items-center text-left"
              >
                <div>
                  <h3 className="text-xl font-bold bg-clip-text text-transparent capitalize bg-gradient-to-r from-purple-400 to-pink-500">
                    {section.meta.title}
                  </h3>
                  <p className="text-gray-300 mt-1">{section.meta.subtitle}</p>
                </div>
                {expandedId === sectionKey ? (
                  <ChevronUp className="h-5 w-5 text-purple-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-purple-400" />
                )}
              </motion.button>

              <AnimatePresence>
                {expandedId === sectionKey && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-gray-700"
                  >
                    <div className="p-6 bg-gray-800/80">
                      {section.data.length > 0 ? (
                        sortSectionsContent(section.data).map((essay, index) => (
                          <div key={index} className="mb-6 last:mb-0">
                            <EssayHeading essay={essay} />
                            <EssayDescription description={essay.description} />
                            <EssayLinks links={essay.links} />
                            <EssayKeyProjects keyProjects={essay.keyProjects} />
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
