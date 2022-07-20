import { dbService, storageService } from "fBase";
import { snapshotEqual } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import {v4 as uuidv4} from "uuid";

const Home= ({userObj}) => {
    const [nweet,setNweet]=useState("");
    const [nweets,setNweets]=useState([]);
    const [attachment,setAttachment]=useState("");
    
    useEffect(()=>{
        dbService.collection("nweets").onSnapshot((snapshot)=>{
            const nweetArray=snapshot.docs.map((doc)=>({id:doc.id,...doc.data(),}));
            setNweets(nweetArray);
        })
        
    },[])

    const onSubmit=async(event)=>{
        event.preventDefault();
        let attachmentURL="";
        if(attachment!==""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment,"data_url");
            attachmentURL = await response.ref.getDownloadURL();
        };
        const nweetObj={
                text:nweet,
                createdAt:Date.now(),
                creatorId:userObj.uid,
                attachmentURL
        }
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
    };
    const onChange=(event)=>{
        const{target:{value}}=event;
        setNweet(value);
    };
    const onFileChange=(event)=>{
        const {target:{files}}=event;
        const theFile=files[0];
        const reader =new FileReader();
        reader.onloadend=(finishEvent)=>{
            const{currentTarget:{result}}=finishEvent;
            setAttachment(result)
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachment=()=>{
        setAttachment(null);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}></input>
                <input type="file" onChange={onFileChange} accept="image/*"/>
                <input type="submit" value="Nweet"/>
                {attachment && 
                    <>
                        <img src={attachment} width="50px" height="50px"/>
                        <button onClick={onClearAttachment}>Clear</button>
                    </>
                }
            </form>
            <div>
                {nweets.map((nweet)=>(
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId===userObj.uid}/>
                ))}
            </div>
        </div>
    )
}
export default Home;