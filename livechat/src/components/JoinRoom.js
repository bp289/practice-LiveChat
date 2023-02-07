export default function JoinRoom({setRoom, joinRoom}) {
    return(
        <>
            <input placeholder="room..." onChange={(event) => {
                setRoom(event.target.value);
            }}/>
            <button onClick={joinRoom}> join room</button>
        </>
    )
}