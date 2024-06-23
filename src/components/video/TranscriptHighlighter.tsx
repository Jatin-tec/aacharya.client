import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface TranscriptHighlighterProps {
    params: {
        slug: string;
    };
}

interface TranscriptSegment {
    start: number;
    duration: number;
    text: string;
}

// context
import { useTime } from '@/context/TimeContext';
import { useUser } from '@/context/User';

const TranscriptHighlighter: React.FC<TranscriptHighlighterProps> = ({ params }) => {
    const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
    const transcriptRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null); // Store active word index


    const { currentTime } = useTime();
    const { user } = useUser();

    const fetchTranscript = async (videoId: string) => {
        if(user){
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_DOMAIN}chat/transcript?q=${videoId}/`, {
                    user: user
                });
                const data = response.data;
                setTranscript(data);
            } catch (error) {
                console.error('Failed to fetch transcript:', error);
            }
        }
    };

    // Fetch the transcript data
    useEffect(() => {
        if (params.slug) {
            fetchTranscript(params.slug);
        }
    }, [params.slug, fetchTranscript]);

    // Scroll to the active segment in the transcript
    useEffect(() => {
        transcript.some((segment, segmentIndex) => {
            const words = segment.text.split(' ');
            const wordDuration = segment.duration / words.length;
            return words.some((word, wordIndex) => {
                const wordStartTime = segment.start + wordIndex * wordDuration;
                const wordEndTime = wordStartTime + wordDuration;
                if (currentTime >= wordStartTime && currentTime < wordEndTime) {
                    if (activeIndex !== segmentIndex) {
                        setActiveIndex(segmentIndex);
                    }
                    return true;
                }
                return false;
            });
        });
    }, [currentTime, transcript, activeIndex]);

    useEffect(() => {
        if (activeIndex !== null && transcriptRef.current) {
            const elements = transcriptRef.current.children;
            if (elements[activeIndex]) {
                elements[activeIndex].scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        }
    }, [activeIndex]);

    return (
        <div ref={transcriptRef}>
            {transcript && transcript.map((segment, segmentIndex) => {
                const words = segment.text.split(' ');
                const wordDuration = segment.duration / words.length;
                return (
                    <div key={segmentIndex}>
                        {words.map((word, wordIndex) => {
                            const wordStartTime = segment.start + wordIndex * wordDuration;
                            const isHighlighted = currentTime >= wordStartTime;
                            return (
                                <span
                                    key={wordIndex}
                                    style={{
                                        backgroundColor: isHighlighted ? 'skyBlue' : 'transparent',
                                        transition: 'background-color 300ms ease-in-out',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {word + ' '}
                                </span>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );

};

export default TranscriptHighlighter;
