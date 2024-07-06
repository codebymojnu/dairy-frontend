import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Letter = () => {
  const textBlocksInitial = [
    "আশা,", 
    "দুইটি কদম ফুলের শুভেচ্ছা নিও। অফিস থেকে লিখছি। লিখতে যে হবেই! ", 
    "গতকাল রাতে তোমার কথা শুনে ভীষণ কষ্ট পেয়েছি। সত্যি বলতে যদিও আমি ছেলেটা এই কথাগুলো শোনার জন্য যোগ্য। তবুও মন খারাপ হয়। মানুষ তো আমি, আশা। তবুও সবকিছু এক পাশে রেখে সকালে টিউশনি পড়িয়ে, অফিসে এসেছি।",       
    "আমার ব্যর্থতার গল্প লিখতে আর ইচ্ছে করে না। আমারও ইচ্ছে করে- সফলতার গল্প লিখতে। সফলতার গল্প বলতে।",    
    "সবসময় শুভকামনা, মেহজাবিন। আল্লাহ যেন তোমার কোনো স্বপ্ন অপূর্ণ না রাখেন।",
    "ইতি,",
    "তোমার মজনু", 

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
    <div className="h-screen flex justify-center bg-black text-white">
      <div className="w-full md:max-w-md lg:max-w-lg m-2 bg-gray-800 p-6 md:p-8 border border-gray-300 rounded-lg shadow-md">
        <div className="text-base text-justify md:text-lg lg:text-xl font-serif leading-relaxed text-white my-4">
          <div
            style={{
              minHeight: "30em",
              maxHeight: "60em",
              overflowY: "auto",
              color: "#0EACEE",
              fontSize: "14px",
              lineHeight: "1.5",
              fontFamily: 'Google Sans, "Helvetica Neue", sans-serif',
              fontWeight: 400,
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
