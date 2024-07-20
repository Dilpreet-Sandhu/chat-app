import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { AttachFile, Send } from "@mui/icons-material";
import FileMenu from "../components/dialog/FileMenu";
import { messageData } from "../components/shared/sample";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../utils/constants";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useSocketEvents } from "../components/auth/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessageAlert } from "../redux/reducers/chat";
import toast from "react-hot-toast";
import { TypingLoader } from "../components/loaders/loaders";
import { useNavigate } from "react-router-dom";

const user = {
  _id: "falkfw3320af",
  name: "baba",
};

function Chat({ chatId, user }) {
  const containerRef = useRef();
  const lastMessageRef = useRef(null);
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messageArr, setMessageArr] = useState([]);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [iAmTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeOut = useRef(null);
  const socket = getSocket();
  const navigate = useNavigate();

  const chatDetails = useChatDetailsQuery({ chatId }, { skip: !chatId });

  let members = chatDetails.data?.data?.members;
  


  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk?.data?.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk?.data?.data?.messages
  );

  const handleFileMenu = (e) => {
    dispatch(setIsFileMenu(true));
    setAnchorEl(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (messageArr.length < 0) {
      return toast.error("please refresh socket couldn't connect sucessfully");
    }
    if (!message.trim()) return;
    console.log(message)

    socket.emit(NEW_MESSAGE, { chatId: chatId, members: members, message });
    setMessage("");
  };

  useEffect( () => {
    dispatch(removeNewMessageAlert({ chatId }));

    

    return () => {
      setMessageArr([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);

    };
  }, [chatId]);


  const messageChangeHandler = (e) => {
    setMessage(e.target.value);

    if (!iAmTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeOut.current) {
      clearTimeout(typingTimeOut.current);
    }

    typingTimeOut.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, 1000);
  };

  const newMessageHandler = useCallback(
    (data) => {
      if (data?.chatId !== chatId) return;

      console.log(data)

      setMessageArr((prev) => [...prev, data?.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data?.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data?.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const alertHandler = useCallback(
    (data) => {
      if (data?.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender : {
          _id  : "sadfjklaej0320r0g0sertj03",
          name : "admin"
        },
        chat : data?.chatId,
        createdAt : new Date().toISOString()
      }

      setMessageArr((prev) => [...prev,messageForAlert])

    }
  )

  const eventArr = {
    [ALERT] : alertHandler,
    [NEW_MESSAGE]: newMessageHandler,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventArr);

  

  const allMessages = [...oldMessages, ...messageArr];

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"rgba(0,0,0,0.1)"}
        height={"90%"}
        sx={{ overflowX: "hidden", overflowY: "auto" }}
      >
        {!oldMessagesChunk.isLoading &&
          allMessages.map((data, idx) => {
            return (
              <MessageComponent
                ref={idx === allMessages.length - 1 ? lastMessageRef : null}
                key={idx}
                message={data}
                user={user}
              />
            );
          })}

        {userTyping && <TypingLoader />}

        <div />
      </Stack>

      <form style={{ height: "10%" }}>
        <Stack
          direction="row"
          height={"100%"}
          padding="10px"
          position="relative"
          alignItems="center"
        >
          <IconButton
            onClick={handleFileMenu}
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
          >
            <AttachFile />
          </IconButton>

          <input
            placeholder="Type message here"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              padding: "0 3rem",
              borderRadius: "1.5rem",
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
            value={message}
            onChange={messageChangeHandler}
          />

          <IconButton
            type="submit"
            sx={{
              bgcolor: "#ea7070",
              padding: "0.5rem",
              marginLeft: "1rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
            onClick={submitHandler}
          >
            <Send />
          </IconButton>
        </Stack>
      </form>

      <FileMenu chatId={chatId} anchorEl={anchorEl} />
    </Fragment>
  );
}

export default AppLayout()(Chat);
