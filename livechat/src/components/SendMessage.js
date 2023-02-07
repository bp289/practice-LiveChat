export default function SendMessage({setMessage, sendMessage}) {
    return (
        <>
        <input placeholder="message..." onChange={(event) => {
            setMessage(event.target.value);
        }}/>
        <button onClick={sendMessage}> send message</button>
        </>
    )
}