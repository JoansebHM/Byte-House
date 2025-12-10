import { Star, Camera } from "lucide-react";
import { REVIEWS, type Review } from "../../data/mockData";
import { useState } from "react";
import ReviewModal from "./ReviewModal";

const ReviewsSection = () => {
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    return (
        <section className="py-16 border-t border-black dark:border-white overflow-hidden">
            <div className="px-4 mb-12">
                <h2 className="text-3xl md:text-5xl font-light font-bitcount text-center text-black dark:text-white tracking-widest">
                    TESTIMONIOS
                </h2>
            </div>

            <div className="relative w-full">
                {/* Marquee Container */}
                <div className="flex w-max animate-[marquee_80s_linear_infinite] hover:[animation-play-state:paused]">
                    {/* Double the list to create seamless loop */}
                    {[...REVIEWS, ...REVIEWS].map((review, index) => (
                        <div
                            key={`${review.id}-${index}`}
                            onClick={() => setSelectedReview(review)}
                            className="w-[300px] md:w-[400px] mx-4 p-6 border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 group cursor-pointer flex-shrink-0 relative"
                        >
                            {review.images && review.images.length > 0 && (
                                <div className="absolute top-4 right-4 text-gray-400 group-hover:text-white dark:group-hover:text-black">
                                    <Camera size={20} />
                                </div>
                            )}

                            <div className="flex gap-1 mb-4 text-black dark:text-white group-hover:text-white dark:group-hover:text-black">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i < review.rating ? "currentColor" : "none"}
                                        className={i < review.rating ? "text-current" : "text-gray-300 dark:text-gray-700"}
                                    />
                                ))}
                            </div>
                            <p className="font-inconsolata text-sm mb-6 leading-relaxed line-clamp-3 min-h-[60px]">
                                "{review.comment}"
                            </p>
                            <div className="flex justify-between items-end border-t border-black dark:border-white group-hover:border-white dark:group-hover:border-black pt-4">
                                <span className="font-bold text-lg">{review.user}</span>
                                <span className="text-xs opacity-70">{review.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedReview && (
                <ReviewModal
                    review={selectedReview}
                    onClose={() => setSelectedReview(null)}
                />
            )}
        </section>
    );
};

export default ReviewsSection;
