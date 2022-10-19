import React, { useState, useEffect, useRef } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

function Chat() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const sendMsg = () => {
    if (message === "") return;
    setMessages((prev) => {
      let chat = [...prev, message];
      setMessage("");
      return chat;
    });
  };
  const lastMsg = useRef();
  const open = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="chatwrapper"
      style={{
        right: router.locale === "en" ? "40px" : "unset",
        left: router.locale === "en" ? "unset" : "40px",
      }}
    >
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="chat-body-wrapper"
      >
        <motion.div
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
              display: "block",
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
              display: "none",
            },
          }}
          style={{
            pointerEvents: isOpen ? "auto" : "none",
            borderRadius: "10px",
            border: "1px solid #ccc",
            overflow: "hidden",
          }}
        >
          <div className="header">
            <h3>{t("common:chat_header")}</h3>
            <button className="close-btn">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="chat-body">
            <div
              className="chat"
              style={{
                overflowY:
                  lastMsg.current?.offsetTop > 220 ? "scroll" : "hidden",
              }}
            >
              <div className="stk-msg">
                <p>hello</p>
              </div>
              <div className="client-msg">
                <p>helloz helloz</p>
              </div>
              {messages.map((message, index) => (
                <div className="client-msg" ref={lastMsg} key={index}>
                  <p>{message}</p>
                </div>
              ))}
            </div>
            <InputTextarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              cols={30}
              style={{ height: "75px" }}
              autoResize
              placeholder={t("common:chat_msg_placeholder")}
            />
            <button className="send-btn" onClick={sendMsg}>
              {t("common:chat_sendbtn")}
            </button>
          </div>
        </motion.div>
      </motion.div>

      <button
        className="chat-head"
        onClick={open}
        style={{ marginRight: router.locale === "en" ? "0" : "auto" }}
      >
        {t("common:chat")}
      </button>
      <style jsx>
        {`
          .chat-body-wrapper {
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #ccc;
          }
          .chatwrapper {
            direction: rtl;
            max-width: 350px;
            position: fixed;
            z-index: 100;
            bottom: 40px;
            right: 40px;
            border-radius: 10px;
            overflow: hidden;
          }
          .chat-head {
            display: block;
            width: 70px;
            height: 70px;
            background-color: var(--secondary-color);
            border-radius: 50%;
            text-align: center;
            margin-top: 1rem;
            cursor: pointer;
            color: #fff;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            border: 1px solid #ccc;
            &:hover {
              color: #000;
            }
          }
          .chat-body {
            background-color: #fff;
            border: 1px solid #ccc;
            padding: 1rem;
          }
          .chat {
            height: 220px;
            max-height: 220px;

            margin: 0rem 0 1rem;
            border-radius: 10px;
          }
          .header {
            display: flex;
            justify-content: space-between;
            background-color: var(--secondary-color);
            padding: 1rem;
          }
          .stk-msg p {
            background-color: #ccc;
            margin-right: auto;
          }
          .client-msg p {
            background-color: var(--secondary-color);
            color: #fff;
          }
          .stk-msg {
            display: flex;
            justify-content: flex-end;
          }
          .client-msg {
            display: flex;
            justify-content: flex-start;
          }
          .stk-msg p,
          .client-msg p {
            display: inline-block;
            margin-bottom: 10px;
            padding: 0.5rem;
            border-radius: 10px;
            max-width: 200px;
          }
          .send-btn {
            border: 1px solid #ccc;
            border-radius: 10px;
            font-size: 1.2rem;
            background-color: var(--secondary-color);
            color: #fff;
            padding: 0.5rem 1rem;
            display: inline-block;
            margin-top: 0.5rem;
            cursor: pointer;
          }
          .close-btn {
            background: none;
            font-size: 1.2rem;
            border: none;
            cursor: pointer;
            color: #fff;
          }
          h3 {
            color: #fff;
          }
        `}
      </style>
    </div>
  );
}

export default Chat;
