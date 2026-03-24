
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanInput } from '../types';

interface ScannerProps {
  onScan: (input: ScanInput) => void;
  onCancel: () => void;
}

type ScanMode = 'text' | 'image' | 'audio' | 'video';

const Scanner: React.FC<ScannerProps> = ({ onScan, onCancel }) => {
  const [activeMode, setActiveMode] = useState<ScanMode>('text');
  const [text, setText] = useState('');
  const [mediaData, setMediaData] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      stopCamera();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setIsRecording(false);
  };

  const startCamera = async (mode: 'image' | 'video') => {
    try {
      const constraints = mode === 'video' 
        ? { video: { facingMode: 'environment' }, audio: true }
        : { video: { facingMode: 'environment' } };
        
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Access denied", err);
      alert("Permission denied. Please check camera and microphone settings.");
    }
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setMediaData(dataUrl.split(',')[1]);
        setMimeType('image/png');
        stopCamera();
      }
    }
  };

  const startRecording = () => {
    if (!videoRef.current?.srcObject) return;
    const stream = videoRef.current.srcObject as MediaStream;
    const recorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: activeMode === 'video' ? 'video/mp4' : 'audio/webm' });
      setMimeType(blob.type);
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        setMediaData(base64);
      };
      reader.readAsDataURL(blob);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
    setRecordingTime(0);
    timerRef.current = window.setInterval(() => setRecordingTime(t => t + 1), 1000);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    stopCamera();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        setMediaData(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    
    const input: ScanInput = {};
    if (activeMode === 'text' && text.trim()) {
      input.text = text;
    } else if (mediaData) {
      input.media = {
        data: mediaData,
        mimeType: mimeType,
        type: activeMode as 'image' | 'audio' | 'video'
      };
    } else {
      return;
    }

    setIsSubmitting(true);
    onScan(input);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const modes: { id: ScanMode; label: string; icon: string }[] = [
    { id: 'text', label: 'Text/SMS', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' },
    { id: 'image', label: 'Image', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'audio', label: 'Audio', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
    { id: 'video', label: 'Video', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Verification Terminal</h1>
          <p className="text-slate-400">Private entry point for on-demand scam verification.</p>
        </div>
        <button 
          onClick={() => { stopCamera(); onCancel(); }}
          disabled={isSubmitting}
          className="text-slate-500 hover:text-white transition-colors disabled:opacity-30 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
          Cancel
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {modes.map(mode => (
          <button
            key={mode.id}
            disabled={isSubmitting}
            onClick={() => { setActiveMode(mode.id); setMediaData(null); stopCamera(); }}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all ${
              activeMode === mode.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-slate-900 text-slate-500 border border-white/5 hover:border-white/10'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mode.icon} />
            </svg>
            {mode.label}
          </button>
        ))}
      </div>

      <div className="space-y-6 relative">
        {isSubmitting && (
           <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             className="absolute inset-0 z-50 bg-slate-950/40 backdrop-blur-[2px] rounded-[2rem] flex items-center justify-center"
           >
             <div className="flex flex-col items-center gap-4">
               <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
               <p className="font-mono text-sm uppercase tracking-widest text-blue-400">Processing Verification...</p>
             </div>
           </motion.div>
        )}

        <AnimatePresence mode="wait">
          {activeMode === 'text' && (
            <motion.div 
              key="text"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className={`glass rounded-[2rem] overflow-hidden border border-white/10 transition-all ${isSubmitting ? 'opacity-50' : ''}`}
            >
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isSubmitting}
                placeholder="Paste suspicious content, URLs, or scripts for verification..."
                className="w-full h-64 bg-transparent p-10 text-xl focus:outline-none resize-none placeholder-slate-800 font-medium leading-relaxed"
              />
            </motion.div>
          )}

          {(activeMode === 'image' || activeMode === 'video') && (
            <motion.div 
              key="camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div 
                onClick={() => !isSubmitting && !isCameraActive && fileInputRef.current?.click()}
                className={`glass border-dashed border-2 border-white/10 hover:border-blue-500/50 rounded-3xl p-10 flex flex-col items-center justify-center transition-all group ${isSubmitting || isCameraActive ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <input type="file" ref={fileInputRef} className="hidden" accept={`${activeMode}/*`} onChange={handleFileChange} />
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                </div>
                <p className="text-lg font-bold text-slate-400">Import {activeMode} for Verification</p>
              </div>

              <div className={`glass border-2 border-white/10 rounded-3xl overflow-hidden relative min-h-[250px] flex flex-col items-center justify-center ${isSubmitting ? 'opacity-30' : ''}`}>
                {isCameraActive ? (
                  <>
                    <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />
                    
                    {activeMode === 'video' && isRecording && (
                      <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-600 px-3 py-1.5 rounded-full shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-white uppercase tracking-widest">{formatTime(recordingTime)}</span>
                      </div>
                    )}

                    <div className="absolute bottom-8 left-0 w-full flex justify-center gap-6">
                      <button 
                        onClick={() => activeMode === 'video' ? (isRecording ? stopRecording() : startRecording()) : captureFrame()}
                        className={`w-16 h-16 rounded-full border-4 border-white shadow-2xl flex items-center justify-center transition-transform active:scale-90 ${isRecording ? 'bg-white' : 'bg-transparent'}`}
                      >
                         <div className={`transition-all ${isRecording ? 'w-6 h-6 bg-red-600 rounded-sm' : 'w-12 h-12 bg-white rounded-full'}`} />
                      </button>
                      <button onClick={stopCamera} className="bg-slate-900/80 backdrop-blur-md p-4 rounded-full text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  </>
                ) : (
                  <button onClick={() => startCamera(activeMode as any)} className="flex flex-col items-center gap-4 p-10 w-full h-full hover:bg-white/5 transition-colors">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <p className="text-lg font-bold text-slate-400">Live Capture Analysis</p>
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {activeMode === 'audio' && (
            <motion.div 
              key="audio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div 
                onClick={() => !isSubmitting && !isCameraActive && fileInputRef.current?.click()}
                className={`glass border-dashed border-2 border-white/10 hover:border-blue-500/50 rounded-3xl p-16 flex flex-col items-center justify-center transition-all group ${isSubmitting || isCameraActive ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <input type="file" ref={fileInputRef} className="hidden" accept="audio/*" onChange={handleFileChange} />
                <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                </div>
                <p className="text-xl font-bold text-slate-400">Verify Audio Recording</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <canvas ref={canvasRef} className="hidden" />

        {mediaData && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="glass p-6 rounded-3xl border border-blue-500/40 bg-blue-500/5 flex items-center gap-6"
          >
            <div className="w-24 h-24 bg-slate-900 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
              {activeMode === 'image' ? (
                <img src={`data:${mimeType};base64,${mediaData}`} className="w-full h-full object-cover" />
              ) : (
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-blue-400 uppercase tracking-wide">Verification Payload Ready</h3>
              <p className="text-slate-500 font-mono text-xs mt-1">{mimeType} • Privacy Locked</p>
            </div>
            <button onClick={() => setMediaData(null)} className="p-4 rounded-2xl hover:bg-red-500/10 text-slate-600 hover:text-red-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </motion.div>
        )}

        <motion.button
          whileHover={!isSubmitting ? { scale: 1.01 } : {}}
          whileTap={!isSubmitting ? { scale: 0.99 } : {}}
          disabled={((activeMode === 'text' && !text.trim()) || (activeMode !== 'text' && !mediaData)) || isSubmitting}
          onClick={handleSubmit}
          className="w-full py-6 rounded-3xl font-bold text-2xl transition-all relative overflow-hidden group disabled:opacity-50 mt-4"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700" />
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center justify-center gap-4">
            {isSubmitting ? 'Verifying Intelligence...' : 'Initiate Scam Verification'}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </span>
        </motion.button>
      </div>
    </div>
  );
};

export default Scanner;
