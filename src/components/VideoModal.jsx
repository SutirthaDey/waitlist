function VideoModal({ src, onClose }) {
  if (!src) return null;

  return (
    <div
      className="video-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Full video player"
      onClick={onClose}
    >
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="video-modal-close"
          onClick={onClose}
          aria-label="Close video player"
        >
          Close
        </button>
        <video className="video-modal-player" src={src} controls autoPlay playsInline />
      </div>
    </div>
  );
}

export default VideoModal;
