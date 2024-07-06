import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Letter = () => {
  const textBlocksInitial = [
    "আশা,",
    "দুইটি কদম ফুলের শুভেচ্ছা নিও। অফিস থেকে লিখছি। লিখতে যে হবেই! ",
    "গতকাল রাতে তোমার কথা শুনে ভীষণ কষ্ট পেয়েছি। সত্যি বলতে যদিও আমি ছেলেটা এই কথাগুলো শোনারই যোগ্য। তবুও মন খারাপ হয়। মানুষ তো আমি, আশা।",
    "ব্যাডা মানুষের মতো তবুও সবকিছু এক পাশে রেখে সকালে টিউশনি পড়িয়ে, অফিসে এসেছি।",
    "আমার ব্যর্থতার গল্প লিখতে আর ইচ্ছে করে না। আমারও ইচ্ছে করে- সফলতার গল্প লিখতে। সফলতার গল্প বলতে।",
    "তবে এই চিঠিতে বাধ্য হয়েই— তোমাকে আমার ব্যর্থতার গল্পই লিখতে হচ্ছে। এতটুকু বিশ্বাস রাখো আশা, আমি এরপর তোমাকে আমারণ ব্যর্থতার গল্প শোনাবো না।",
    "আমি এখনও খাই নি। লিখতেছি, আমার বডি সায় দিচ্ছে না। তবুও জোর করেই লিখছি।",
    "গতকাল বললে- তোমার কাছে যাওয়ার জন্য আমি পা তুলে নেই! অথচ বিয়ে নাকি মানুষ করে সাপোর্টের জন্য। তোমাকে আমার ভীষণ প্রয়োজন ছিল এই মূহুর্তে।",
    "আমি চাকরি করি। টিউশনি পড়াই। অনলাইনে কাজ করি। কিন্তু তবুও আমি পকেট শূন্য থাকি। আমার ভুল। টাকাই আমাকে খেয়ে ফেলেছে। এই মাসেও ১২ হাজার টাকা লস করেছি। এইবার আমি এই ভুলটি করে- আমি শুয়ে পড়েছি।",
    "আমি জানি না- অন্য কোনো মেয়ে হলে স্বামীর এই খারাপ সময়ে কি করতো? ভালোবাসা আর বিশ্বাস থাকলে বোধ করি- কোনো বুদ্ধিমতী  হলে স্বামীকে শান্ত করে রাখতো। একটা সমাধান দিতো। ভালোভাবে কথাগুলো শুনতো। “এখন কি করবো আমি বলোতো? আচ্ছা, টেনশন করো না। আমি দেখছি। আমি তোমার কাছে চলে আসছি।",
    "আমি এখানে স্যারকে দেয়ার ৪০০০ টাকা দিই নি। মেসের এক জুনিয়রের ২০০০ টাকা দিই নি। মেসের রুম ভাড়া, খাওয়া ২০০০ টাকা দিই নি। বাসা ভাড়া নেয়ার জন্য ৪০০০ টাকা দরকার।",
    "সব মিলে তের হাজার টাকা আমাকে ম্যানেজ করতে হবে। কিন্তু ম্যানেজ করার রাস্তাগুলো এখন খুব সংকীর্ণ।",
    "আমি তোমার উপর আশা করেছি। হয়তো আশা, বাবাকে যে কোনো ভাবে বুঝিয়ে ম্যানেজ করে, গাড়িতে উঠে পাবনা চলে আসবে। যাতে কেউই ব্যাপারটা বুঝতে না পারে। স্বামীকে একটাবার সুযোগ তো দিতো!",
    "আশা- অনেক কিছু লিখে ফেললাম। আমি এটা অন্যায় করেছি। মাফ করিও। আর আমার জন্য দোয়া করিও।",
    "ইতি,",
    "তোমারই  সাথী, মজনু।",

    // Add more text blocks as needed
  ];

  const [textBlocks, setTextBlocks] = useState(textBlocksInitial);

  const [typedBlocks, setTypedBlocks] = useState([]);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login page if token is not available
      navigate("/login");
    } else {
      // just check for localStorage JWT token valid or not
      fetch(`https://pg-backend-nine.vercel.app/giftdata`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch messages data");
          }
          return response.json();
        })
        .then((data) => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
          navigate("/login");
        });
    }
  }, [navigate]);

  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(() => {
        let currentTextBlock = textBlocks[currentBlockIndex];

        if (currentText.length < currentTextBlock.length) {
          setCurrentText(currentTextBlock.slice(0, currentText.length + 1));
        } else {
          if (currentBlockIndex === textBlocks.length - 1) {
            setIsTyping(false); // Stop typing if it's the last block
          } else {
            setCurrentText(""); // Clear current text for the next block
            setCurrentBlockIndex((prevIndex) => prevIndex + 1); // Move to the next block
          }
          setTypedBlocks([...typedBlocks, currentText]); // Add the typed block to typedBlocks
        }
      }, 100); // Typing speed

      return () => clearTimeout(timeout);
    }
  }, [currentText, currentBlockIndex, isTyping, textBlocks, typedBlocks]);

  return (
    <div className=" flex justify-center">
      <div className="w-full md:max-w-md lg:max-w-lg m-2  p-6 md:p-8 rounded-lg shadow-md">
        <div className="text-base text-justify md:text-lg lg:text-xl font-serif leading-relaxed my-4">
          <div
            style={{
              fontFamily: 'Google Sans, "Helvetica Neue", sans-serif',
              fontWeight: 400,
              fontSize: "14px",
            }}
          >
            {typedBlocks.map((block, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                {block}
              </div>
            ))}
            {isTyping && (
              <div
                style={{
                  marginBottom: "1rem",
                }}
              >
                {currentText}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Letter;
