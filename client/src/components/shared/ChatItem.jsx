import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { memo } from "react";
import AvatarBox from "./AvatarBox";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessage,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      style={{ textDecoration: "none" }}
    >
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: "0" }}
        transition={{ delay: index * 0.1 }}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          borderBottom: "1px solid #f0f0f0",
          gap: "1rem",
          position: "relative",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.1)",
          },
        }}
      >
        <AvatarBox avatar={avatar} />
        <Stack>
          <Typography
            sx={{ color: sameSender ? "white" : "black", marginLeft: "3rem" }}
          >
            {name}
          </Typography>
          {newMessage && (
            <Typography
              sx={{ marginLeft: "3rem", color: sameSender ? "white" : "black" }}
            >
              {newMessage.count} New messages
            </Typography>
          )}
        </Stack>
        {false && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%))",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
