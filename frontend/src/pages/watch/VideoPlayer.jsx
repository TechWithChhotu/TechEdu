export default function VideoPlayer({ lecture }) {
  if (!lecture) return null;

  return (
    <div className="bg-black aspect-video">
      {lecture.type === "recorded" ? (
        <video
          src={lecture.video}
          controls
          autoPlay
          className="w-full h-full"
        />
      ) : (
        <iframe
          src={lecture.video}
          allow="camera; microphone; fullscreen"
          className="w-full h-full"
        />
      )}
    </div>
  );
}

// const VideoPlayer = () => {
//   return (
//     <div className="bg-black aspect-video">
//       {/* Recorded Video */}
//       <video
//         controls
//         className="w-full h-full"
//         poster="https://img.youtube.com/vi/Ke90Tje7VS0/maxresdefault.jpg"
//       >
//         <source
//           src="https://www.w3schools.com/html/mov_bbb.mp4"
//           type="video/mp4"
//         />
//       </video>

//       {/* Live Class (Jitsi Example) */}
//       {/*
//       <iframe
//         src="https://meet.jit.si/TechEdu-Live-Class"
//         allow="camera; microphone; fullscreen"
//         className="w-full h-full"
//       ></iframe>
//       */}
//     </div>
//   );
// };

// export default VideoPlayer;
