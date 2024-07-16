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
import { NEW_MESSAGE } from "../utils/constants";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useSocketEvents } from "../components/auth/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";

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
  const [anchorEl,setAnchorEl] = useState(null);
  const socket = getSocket();

  const chatDetails = useChatDetailsQuery({ chatId }, { skip: !chatId });

  const members = chatDetails?.data?.data?.members;

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setMessage: setOldMessages } =
    useInfiniteScrollTop(
      containerRef,
      oldMessagesChunk?.data?.data?.totalPages,
      page,
      setPage,
      oldMessagesChunk?.data?.data?.messages
    );

    const handleFileMenu = (e) => {
        dispatch(setIsFileMenu(true))
        setAnchorEl(e.currentTarget)
    }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit(NEW_MESSAGE, { chatId: chatId, members: members, message });
    setMessage("");
  };
  const newMessageHandler = useCallback((data) => {
    setMessageArr((prev) => [...prev, data?.message]);
  }, []);

  const eventArr = { [NEW_MESSAGE]: newMessageHandler };

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
        {!oldMessagesChunk.isLoading && allMessages.map((data, idx) => {
          return (
            <MessageComponent
              ref={idx === allMessages.length - 1 ? lastMessageRef : null}
              key={idx}
              message={data}
              user={user}
            />
          );
        })}
      </Stack>

      <form style={{ height: "10%" }}>
        <Stack
          direction="row"
          height={"100%"}
          padding="10px"
          position="relative"
          alignItems="center"
        >
          <IconButton onClick={handleFileMenu}
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
            onChange={(e) => setMessage(e.target.value)}
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

      <FileMenu anchorEl={anchorEl}/>
    </Fragment>
  );
}

export default AppLayout()(Chat);
