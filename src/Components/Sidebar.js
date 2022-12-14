import React, { useEffect, useState } from "react";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Sidebar.css";
import { Search } from "@mui/icons-material";
import UserProfile from "./UserProfile";
import db from "../firebase";
function Sidebar({ currentUser, signOut }) {
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [friendList, setFriendList] = useState([]);

  //to perfrom background works

  useEffect(() => {
    const getAllUser = async () => {
      const data = await db.collection("users").onSnapshot((snapshot) => {
        //  console.log(snapshot.docs);
        setAllUsers(
          snapshot.docs.filter((doc) => doc.data().email !== currentUser.email)
        );
      });
    };

    const getFriend = async () => {
      const data = await db
        .collection("FriendList")
        .doc(currentUser.email)
        .collection("list")
        .onSnapshot((snapshot) => {
          //  console.log(snapshot.docs);
          setFriendList(snapshot.docs);
        });
    };

    getAllUser();
    getFriend();
  }, []);
  // console.log(allUsers);

  const searchUSer = allUsers.filter((user) => {
    if (searchInput) {
      if (
        user.data().fullname.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        // console.log(user.data().fullname);
        return user;
      }
    }
  });

  const searchItem = searchUSer.map((user) => {
    return (
      <UserProfile
        name={user.data().fullname}
        photoURL={user.data.photoURL}
        key={user.id}
        email={user.data().email}
      />
    );
  });
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-img" onClick={signOut}>
          <img src={currentUser?.photoURL} alt="" />
        </div>
        <div className="sidebar-header-btn">
          <DonutLargeIcon />
          <InsertCommentIcon />
          <MoreVertIcon />
        </div>
      </div>

      <div className="sidebar-search">
        <div className="sidebar-search-input">
          <Search />
          <input
            type="text"
            name="search"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className="sidebar-chat-list">
        {searchItem.length > 0
          ? searchItem
          : friendList.map((friend) => (
              <UserProfile
                name={friend.data().fullname}
                photoURL={friend.data().photoURL}
                lastMessage={friend.data().lastMessage}
                key={friend + "2"}
                email={friend.data().email}
              />
            ))}
      </div>
    </div>
  );
}

export default Sidebar;