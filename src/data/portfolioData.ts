import { AppMetadata, Project, SkillCategory, ExperienceItem, EducationItem, WallpaperOption } from '../types';
import srinidhiPhoto from '../assets/srinidhi_headshot.jpg';

export const PERSONAL_INFO = {
  name: "Srinidhi N S",
  title: "AI & Data Science Graduate | Aspiring AI Engineer",
  avatar: srinidhiPhoto,
  phone: "+91 80736 92802",
  roles: [
    "AI & Data Science Graduate",
    "Product Operations Lead Intern",
    "Aspiring AI Engineer",
    "Machine Learning Enthusiast",
    "Full-Stack Web Developer"
  ],
  email: "nssrinidhi72884@gmail.com",
  github: "https://github.com/Srinidhi-070",
  linkedin: "https://www.linkedin.com/in/srinidhi-n-s-270351218",
  location: "Bengaluru, India",
  bio: "Hands-on experience across software development, AI, data, and backend systems, with projects spanning machine learning, API development, data pipelines, databases, and application development. Experienced in taking ideas from exploration and experimentation through implementation, working with different technologies and approaches to solve practical technical problems. Comfortable moving across domains, learning unfamiliar tools when required, and applying a broad technical foundation to build reliable, useful software.",
  mission: "To engineer empathetic, high-throughput AI systems that seamlessly solve complex real-world challenges in safety, healthcare, accessibility, and automated reasoning.",
  quickStats: [
    { label: "B.E. GPA", value: "7.8" },
    { label: "Diploma CGPA", value: "9.14" },
    { label: "GitHub Repos", value: "16+" },
    { label: "Primary Stack", value: "Python, Java, TensorFlow, React, SQL" }
  ]
};

export const APPS_METADATA: AppMetadata[] = [
  {
    id: 'home',
    title: 'Dashboard',
    shortTitle: 'Home',
    icon: 'LayoutDashboard',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    description: 'System overview, quick metrics, recent activities & pinned apps.',
    isPinned: true,
    category: 'core'
  },
  {
    id: 'about',
    title: 'About Me',
    shortTitle: 'About',
    icon: 'User',
    color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    description: 'Personal journey, core mission, career interests, and AI philosophies.',
    isPinned: true,
    category: 'core'
  },
  {
    id: 'projects',
    title: 'Projects Explorer',
    shortTitle: 'Projects',
    icon: 'FolderGit2',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    description: 'Deep dive into 16+ AI, Computer Vision, WebRTC & Full Stack projects.',
    isPinned: true,
    category: 'engineering'
  },
  {
    id: 'skills',
    title: 'Skills Matrix',
    shortTitle: 'Skills',
    icon: 'Cpu',
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    description: 'Interactive visualization of AI, ML, Backend, Cloud & Product Ops competencies.',
    isPinned: true,
    category: 'engineering'
  },
  {
    id: 'terminal',
    title: 'Warp Terminal',
    shortTitle: 'Terminal',
    icon: 'Terminal',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    description: 'Power-user CLI environment with neofetch, AI assistant, bash commands & secret easter eggs.',
    isPinned: true,
    category: 'core'
  },
  {
    id: 'github',
    title: 'GitHub Metrics',
    shortTitle: 'GitHub',
    icon: 'Github',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    description: 'Live repository metrics, contribution stats, star counts, and recent commits.',
    isPinned: true,
    category: 'engineering'
  },
  {
    id: 'experience',
    title: 'Career Timeline',
    shortTitle: 'Experience',
    icon: 'Briefcase',
    color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    description: 'Product Operations Internship, leadership roles, and project impact.',
    isPinned: true,
    category: 'core'
  },
  {
    id: 'education',
    title: 'Education',
    shortTitle: 'Education',
    icon: 'GraduationCap',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    description: 'Academic background in Artificial Intelligence & Data Science.',
    isPinned: false,
    category: 'core'
  },
  {
    id: 'resume',
    title: 'Resume Viewer',
    shortTitle: 'Resume',
    icon: 'FileText',
    color: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    description: 'Interactive resume, section jump, print & 1-click PDF export.',
    isPinned: true,
    category: 'core'
  },
  {
    id: 'contact',
    title: 'Contact Center',
    shortTitle: 'Contact',
    icon: 'Mail',
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    description: 'Direct messaging interface, calendar booking links & social connections.',
    isPinned: true,
    category: 'core'
  },
  {
    id: 'settings',
    title: 'System Preferences',
    shortTitle: 'Settings',
    icon: 'Sliders',
    color: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
    description: 'Themes, accent colors, wallpaper gallery, sound effects & animation controls.',
    isPinned: true,
    category: 'system'
  }
];

export const PROJECTS: Project[] = [
  // AI / ML
  {
    id: 'guardian-voice',
    title: 'GuardianVoice – Real-Time Scam Detection',
    shortDescription: 'AI Voice Scam Detection System using Deep Learning & Audio Pattern Analysis',
    category: 'AI / Machine Learning',
    githubUrl: 'https://github.com/Srinidhi-070/GuardianVoice',
    overview: 'A real-time voice analysis microservice designed to instantly transcribe speech and detect scam patterns for elder protection.',
    features: [
      'Developed a real-time voice analysis microservice using Python and machine learning to instantly transcribe speech and detect scam patterns for elder protection.',
      'Engineered adaptive risk threshold algorithms and rule-based filters, enabling live audio processing and automated spoken warnings during active phone calls.'
    ],
    architecture: 'Input Audio Stream -> Web Audio API / PyAudio -> MFCC & Mel-Spectrogram Engine -> PyTorch Transformer Model -> Intent Classifier -> Realtime Alert Bus',
    techStack: ['Python', 'Machine Learning', 'Speech API'],
    challenges: 'Achieving sub-200ms latency on continuous audio streams while avoiding false positives on noisy cellular phone lines.',
    learnings: 'Mastered streaming audio buffer management, spectral feature extraction, and lightweight model quantization.',
    stars: 18,
    featured: true,
    metrics: [
      { label: 'Inference Latency', value: '< 180ms' },
      { label: 'Detection Accuracy', value: '96.4%' }
    ]
  },
  {
    id: 'leaf-medic',
    title: 'LeafMedic',
    shortDescription: 'Automated Plant Leaf Disease Detection using Convolutional Neural Networks',
    category: 'AI / Machine Learning',
    githubUrl: 'https://github.com/Srinidhi-070/-LeafMedic---Automated-Plant-Leaf-Disease-Detection',
    overview: 'An edge-deployable computer vision solution for early detection of agricultural leaf diseases, helping farmers minimize crop loss through instant leaf image diagnostic scans.',
    features: [
      'Multi-class disease classifier covering 38+ plant species and lesion pathologies.',
      'Mobile-optimized MobileNetV3 / EfficientNet backbone for edge execution.',
      'Automated treatment recommendation engine based on diagnosed condition.',
      'Offline diagnostic support with sync capability.'
    ],
    architecture: 'Camera Input -> Image Preprocessing & Segmentation -> EfficientNet B0 Feature Extractor -> Softmax Multi-class Classifier -> Diagnostic Report Engine',
    techStack: ['Python', 'TensorFlow / Keras', 'OpenCV', 'Streamlit', 'MobileNetV3', 'Docker'],
    challenges: 'Handling lighting variation, shadow interference, and background soil clutter in real field conditions.',
    learnings: 'Deepened expertise in transfer learning, data augmentation pipelines (mixup, cutmix), and edge deployment.',
    stars: 14,
    featured: true,
    metrics: [
      { label: 'Plant Classes', value: '38 Pathologies' },
      { label: 'Validation Acc', value: '97.8%' }
    ]
  },
  {
    id: 'cloud-ai-anomaly-guardian',
    title: 'Cloud Microservices – Anomaly Guardian',
    shortDescription: 'Cloud-native anomaly detection engine monitoring real-time server telemetry',
    category: 'Backend / Cloud',
    githubUrl: 'https://github.com/Srinidhi-070/cloud-ai-anomaly-guardian',
    overview: 'A scalable microservice processing high-throughput events to effectively detect critical data anomalies in real-time across enterprise environments.',
    features: [
      'Engineered a scalable FastAPI microservice secured with 2 JWT/OAuth protocols, processing 500+ events/second to effectively detect critical data anomalies in real-time.',
      'Deployed containerized applications across 3 environments using Docker and automated CI/CD pipelines, maintaining 99% uptime for the underlying enterprise cloud infrastructure.'
    ],
    architecture: 'Prometheus / Cloud Watch Logs -> Kafka Event Bus -> PyTorch Autoencoder Inference Worker -> InfluxDB Time-Series DB -> Grafana / React UI',
    techStack: ['FastAPI', 'Docker', 'PostgreSQL'],
    challenges: 'Distinguishing normal peak traffic spikes from malicious DDoS or silent resource leakage.',
    learnings: 'Acquired strong insights into unsupervised representation learning, time-series anomaly detection, and cloud infrastructure monitoring.',
    stars: 12,
    featured: true,
    metrics: [
      { label: 'Telemetry Stream', value: '10k events/sec' },
      { label: 'False Alarm Reduction', value: '62%' }
    ]
  },
  {
    id: 'road-safe',
    title: 'RoadSafe',
    shortDescription: 'Real-Time AI Accident Detection & Emergency Dispatch System',
    category: 'AI / Machine Learning',
    githubUrl: 'https://github.com/Srinidhi-070/RoadSafe',
    overview: 'An intelligent traffic CCTV video analysis system designed to instantly spot vehicle collisions, rollover accidents, and high-risk traffic anomalies to accelerate emergency medical response.',
    features: [
      'YOLOv8 custom-trained object detection for crash and vehicle trajectory analysis.',
      'Optical flow speed variance monitoring for sudden deceleration trigger.',
      'Automated SOS dispatch packet generation with GPS coordinates.',
      'CCTV video feed stream manager with multi-camera overlay.'
    ],
    architecture: 'RTSP Video Feed -> Frame Decoding -> YOLOv8 Detection Pipeline -> Trajectory & Impact Classifier -> Emergency Event Bus',
    techStack: ['Python', 'YOLOv8', 'OpenCV', 'PyTorch', 'Flask', 'WebSockets', 'Leaflet.js'],
    challenges: 'Minimizing false crash detections caused by sudden braking, weather rain glare, and camera vibration.',
    learnings: 'Gained hands-on mastery of object tracking algorithms (ByteTrack/DeepSORT) and low-latency video pipeline optimizations.',
    stars: 15,
    featured: true,
    metrics: [
      { label: 'FPS Processing', value: '45 FPS (GPU)' },
      { label: 'Detection Speed', value: '0.8 Seconds' }
    ]
  },
  {
    id: 'gesture-media-controller',
    title: 'Gesture-Based Media Controller',
    shortDescription: 'Computer vision gesture interaction system for touchless UI media control',
    category: 'AI / Machine Learning',
    githubUrl: 'https://github.com/Srinidhi-070/gesture-media-controller',
    overview: 'A touchless human-computer interaction tool that tracks webcam hand skeletal landmarks to control system volume, play/pause, media seek, and window navigation seamlessly.',
    features: [
      'Sub-millimeter hand landmark tracking with MediaPipe Hands framework.',
      'Custom gesture recognizer (pinch volume scale, swipe slide, palm pause).',
      'Cross-platform system keyboard & media key injection.',
      'Visual HUD overlay showing gesture recognition confidence.'
    ],
    architecture: 'Webcam Stream -> MediaPipe Landmark Detector -> Angle & Distance Geometry Engine -> OS Media Event Controller',
    techStack: ['Python', 'MediaPipe', 'OpenCV', 'PyAutoGUI', 'NumPy'],
    challenges: 'Maintaining reliable hand tracking under low-light ambient conditions and fast rapid hand motions.',
    learnings: 'Mastered 3D spatial coordinate geometry, landmark smoothing filters (One-Euro Filter), and cross-platform native input automation.',
    stars: 10,
    metrics: [
      { label: 'Gesture Latency', value: '25ms' },
      { label: 'Tracking Accuracy', value: '98.2%' }
    ]
  },
  {
    id: 'ai-courtroom-simulator',
    title: 'AI Courtroom Simulator',
    shortDescription: 'Generative AI legal argument simulator with multi-agent debate dynamics',
    category: 'AI / Machine Learning',
    githubUrl: 'https://github.com/Srinidhi-070/ai-courtroom-simulator',
    overview: 'An interactive multi-agent legal simulation where AI agents act as Defense Counsel, Prosecutor, and Judge to simulate oral arguments, cross-examine evidence, and render structured legal verdicts.',
    features: [
      'Multi-agent debate engine powered by LLMs with distinct persona constraints.',
      'RAG legal precedent search engine querying statutory precedents.',
      'Automated transcript generation with argument strength metrics.',
      'Interactive user cross-examination mode.'
    ],
    architecture: 'User Evidence Upload -> Vector DB (FAISS/Chroma) -> Multi-Agent LLM Orchestrator -> Judge Decision Engine -> Interactive UI',
    techStack: ['Python', 'LangChain / LlamaIndex', 'Gemini API', 'FastAPI', 'React', 'Tailwind CSS'],
    challenges: 'Preventing LLM hallucinations and ensuring agents strictly abide by court procedure rules and logical consistency.',
    learnings: 'Built deep experience with multi-agent system design, prompt engineering, and Retrieval-Augmented Generation (RAG).',
    stars: 16,
    metrics: [
      { label: 'Precedent Search', value: '< 1.2s' },
      { label: 'Agent Persona Consistency', value: '99%' }
    ]
  },
  {
    id: 'ai-for-health',
    title: 'AI for Health - Disease Prediction',
    shortDescription: 'Multi-pathology clinical diagnostic assistant using Machine Learning',
    category: 'AI / Machine Learning',
    githubUrl: 'https://github.com/Srinidhi-070/AI-for-Health-Predicting-Diseases-with-ML',
    overview: 'A clinical decision support web platform that predicts disease risks (Cardiovascular, Diabetes, Kidney Disease, Liver Health) based on patient lab metrics and clinical parameters.',
    features: [
      'Ensemble model predictions combining XGBoost, Random Forest, and SVM.',
      'SHAP value interpretability charts showing key risk contributing factors.',
      'Patient health trajectory analysis and lifestyle recommendations.',
      'Interactive risk slider calculator.'
    ],
    architecture: 'Patient Metric Form -> Standard Scaler Preprocessing -> XGBoost Ensemble Inference -> SHAP Interpretability Engine -> Patient Summary UI',
    techStack: ['Python', 'Scikit-Learn', 'XGBoost', 'SHAP', 'Flask', 'Bootstrap / Tailwind'],
    challenges: 'Handling imbalanced medical datasets and ensuring model explainability for non-technical clinicians.',
    learnings: 'Gained expertise in medical ML ethics, SHAP/LIME model explainability, and feature selection methodologies.',
    stars: 11,
    metrics: [
      { label: 'Disease Models', value: '4 Clinical Categories' },
      { label: 'ROC-AUC Score', value: '0.94' }
    ]
  },
  {
    id: 'mirage-mvp',
    title: 'MIRAGE MVP',
    shortDescription: 'Future State Image Simulator using Generative Diffusion Models',
    category: 'AI / Machine Learning',
    githubUrl: 'https://github.com/Srinidhi-070/Mirage-MVP',
    overview: 'An AI-powered visual simulation platform that models environmental changes, urban evolution, and temporal aging on input landscape images.',
    features: [
      'Prompt-guided image-to-image diffusion transformation.',
      'Masking & inpainting engine for targeted localized modifications.',
      'Before / After interactive split slider UI.',
      'Resolution upscaling pipeline.'
    ],
    architecture: 'User Image -> Depth/Edge Guidance Map (ControlNet) -> Stable Diffusion Pipeline -> Upscaler -> Interactive Slider Canvas',
    techStack: ['Python', 'PyTorch', 'Diffusers', 'ControlNet', 'FastAPI', 'React'],
    challenges: 'Preserving key image structural geometry while synthesizing realistic temporal and atmospheric variations.',
    learnings: 'Deepened mastery of diffusion models, ControlNet conditioning, and latent space manipulations.',
    stars: 8
  },
  {
    id: 'emotional-syllabus',
    title: 'Agentic AI System – Emotional Syllabus',
    shortDescription: 'Generative AI learning adaptive tool tailored to student emotional state',
    category: 'AI / Machine Learning',
    githubUrl: 'https://github.com/Srinidhi-070/emotional-syllabus',
    overview: 'A full-stack web application handling dynamic multi-modal content generation pipelines and adaptive learning via RAG architectures.',
    features: [
      'Designed a full-stack web application utilizing Python and React.js, handling 1,000+ daily requests through highly dynamic multi-modal content generation pipelines.',
      'Implemented RAG architectures and vector embeddings across 5+ knowledge domains, achieving 90% retrieval accuracy via OpenAI and Claude APIs for end-users.'
    ],
    architecture: 'Webcam/Quiz Telemetry -> Expression & Sentiment Evaluator -> Adaptive Prompt Engine -> Custom Dynamic Syllabus UI',
    techStack: ['Python', 'React.js', 'LLMs', 'REST APIs'],
    challenges: 'Accurately measuring cognitive friction without frustrating the learner with invasive modal prompts.',
    learnings: 'Explored affective computing, cognitive load theory, and personalized LLM tutoring workflows.',
    stars: 9
  },
  {
    id: 'sentiment-analysis',
    title: 'Sentiment Analysis Pipeline',
    shortDescription: 'High-throughput text sentiment and emotion classification pipeline',
    category: 'AI / Machine Learning',
    githubUrl: 'https://github.com/Srinidhi-070/Sentiment-Analysis',
    overview: 'A natural language processing benchmark suite analyzing customer reviews, social media feeds, and user feedback across multiple emotion vectors.',
    features: [
      'Multi-class emotion breakdown (Joy, Anger, Fear, Sadness, Surprise).',
      'BERT fine-tuning pipeline with custom domain corpus.',
      'Batch processing REST API for bulk file uploads.',
      'Interactive wordcloud and frequency distribution visuals.'
    ],
    architecture: 'Text Input -> Tokenizer -> Fine-Tuned DistilBERT Model -> Softmax Emotion Multi-label Output -> Visualization Dashboard',
    techStack: ['Python', 'PyTorch', 'Hugging Face Transformers', 'FastAPI', 'Plotly'],
    challenges: 'Optimizing inference speed for large CSV uploads with thousands of text entries.',
    learnings: 'Mastered transformer tokenization, BERT fine-tuning techniques, and batch inference optimizations.',
    stars: 7
  },

  // Full Stack Projects
  {
    id: 'ar-campus-navigation',
    title: 'AR-Campus-Navigation System',
    shortDescription: 'Augmented Reality web-based indoor/outdoor campus directional guide',
    category: 'Full Stack Projects',
    githubUrl: 'https://github.com/Srinidhi-070/AR-Campus-Navigation',
    overview: 'A highly scalable backend integrated with an AR frontend, computing real-time indoor pathfinding routes via QR-code mapping.',
    features: [
      'Architected a highly scalable FastAPI backend using Python to actively compute real-time indoor pathfinding routes and localize users via QR-code mapping.',
      'Integrated the backend infrastructure with a Unity ARCore frontend application, delivering seamless augmented reality wayfinding experiences for campus visitors.'
    ],
    architecture: 'Mobile Device Sensors (GPS, Gyro, Compass) -> Spatial Graph Engine -> Three.js / WebGL Render Layer -> Augmented Camera Feed UI',
    techStack: ['Python', 'FastAPI', 'Unity', 'ARCore'],
    challenges: 'Overcoming GPS drift in dense multi-story academic buildings through compass sensor smoothing.',
    learnings: 'Gained extensive knowledge in 3D WebGL rendering, WebXR spatial tracking, and mobile web optimization.',
    stars: 17,
    featured: true
  },
  {
    id: 'webrtc-vlm-detection',
    title: 'WebRTC VLM Detection',
    shortDescription: 'Real-time Vision Language Model object detection stream via WebRTC',
    category: 'Full Stack Projects',
    githubUrl: 'https://github.com/Srinidhi-070/webrtc-vlm-detection',
    overview: 'An ultra-low latency streaming architecture connecting browser media tracks directly to backend Vision Language Models for continuous video visual question answering.',
    features: [
      'Sub-100ms peer-to-peer video streaming channel via WebRTC.',
      'Asynchronous frame sampling to server-side Vision Models (MoONDream / Gemini).',
      'Interactive voice query overlay over live video feed.',
      'Bounding box drawing over detected visual targets in real-time.'
    ],
    architecture: 'Browser Webcam -> WebRTC PeerConnection -> Python AI Gateway -> PyTorch VLM Model -> WebSocket Response Channel -> Overlay Canvas',
    techStack: ['TypeScript', 'WebRTC', 'Python', 'FastAPI', 'PyTorch', 'React', 'Tailwind CSS'],
    challenges: 'Optimizing WebRTC frame rate and SDP negotiation across restrictive NAT networks.',
    learnings: 'Mastered WebRTC signaling, STUN/TURN traversal, and real-time streaming AI pipeline design.',
    stars: 15,
    featured: true
  },
  {
    id: 'campus-hub',
    title: 'Campus Hub',
    shortDescription: 'Centralized university student portal, event manager & resource directory',
    category: 'Full Stack Projects',
    githubUrl: 'https://github.com/Srinidhi-070/Campus-Hub',
    overview: 'A modern collaborative web application designed for students to organize university events, share study materials, join interest clubs, and receive real-time campus announcements.',
    features: [
      'Real-time event booking and digital ticket QR code generator.',
      'Collaborative study group channel with markdown file sharing.',
      'Push notification alerts for urgent academic deadlines.',
      'Role-based access control (Student, Club Admin, Faculty).'
    ],
    architecture: 'React Client -> Express REST API -> PostgreSQL Database -> WebSockets Notifications Engine -> S3 File Storage',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'Prisma'],
    challenges: 'Ensuring atomic database transactions during high-demand event registration drops.',
    learnings: 'Mastered relational database schema design, JWT authentication, and WebSockets real-time sync.',
    stars: 13
  },
  {
    id: 'weather-bot',
    title: 'Weather Bot',
    shortDescription: 'Intelligent conversational weather forecaster & climate assistant',
    category: 'Full Stack Projects',
    githubUrl: 'https://github.com/Srinidhi-070/weather-bot',
    overview: 'A context-aware weather assistant that delivers hyper-local forecasts, outdoor clothing advisories, and severe weather alert warnings via interactive chat.',
    features: [
      'Natural language location resolution (e.g. "Will I need an umbrella in Paris tonight?").',
      'OpenWeatherMap API integration with hourly precipitation graphs.',
      'Automated morning daily briefing notifications.',
      'Dynamic animated weather condition backgrounds.'
    ],
    architecture: 'User Query -> NLP Intent Parser -> Weather API Service -> Recommendation Logic -> Rich Card UI',
    techStack: ['TypeScript', 'Node.js', 'React', 'OpenWeather API', 'Tailwind CSS', 'Motion'],
    challenges: 'Translating raw atmospheric data into intuitive human-friendly activity recommendations.',
    learnings: 'Built experience with external API integration, error handling, and reactive motion UI.',
    stars: 8
  },
  {
    id: 'saas-landing-page',
    title: 'Modern SaaS Landing Page',
    shortDescription: 'Ultra-polished marketing interface featuring micro-interactions',
    category: 'Full Stack Projects',
    githubUrl: 'https://github.com/Srinidhi-070/saas-landing-page',
    overview: 'A high-converting, accessible SaaS landing template featuring modern linear-inspired typography, interactive pricing calculators, feature visualizers, and dark-mode aesthetics.',
    features: [
      'Interactive product feature playground.',
      'Dynamic pricing tier toggle with billing calculator.',
      'High-performance Lighthouse score (100 performance/accessibility).',
      'Smooth scroll animations powered by Framer Motion.'
    ],
    architecture: 'Next.js React SPA -> Tailwind CSS Design System -> Framer Motion -> Vercel Edge Hosting',
    techStack: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
    challenges: 'Achieving silky 60fps scroll animations on mobile devices while avoiding layout shifts.',
    learnings: 'Refined understanding of modern design systems, typography hierarchy, and web performance.',
    stars: 10
  },
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio OS',
    shortDescription: 'Next-Generation Desktop Operating System Portfolio Experience',
    category: 'Full Stack Projects',
    githubUrl: 'https://github.com/Srinidhi-070/My-Portfolio',
    overview: 'An ambitious desktop operating system interface inspired by Ubuntu GNOME, Arc, Warp Terminal, and Raycast, presenting projects, skills, and resume in an interactive window environment.',
    features: [
      'Full desktop window system (Open, Close, Minimize, Maximize, Z-index stack, Dragging).',
        'Interactive Warp Terminal with bash commands, neofetch, and simulated AI assistant.',
      'Global Command Palette (Ctrl+K) searching all system content instantly.',
      'Customizable themes, wallpapers, sound feedback, and live GitHub API metrics.'
    ],
    architecture: 'React 19 -> Vite Full-Stack -> Web Audio API -> Framer Motion -> Tailwind CSS v4',
    techStack: ['TypeScript', 'React 19', 'Tailwind CSS', 'Motion', 'Lucide Icons'],
    challenges: 'Creating an intuitive, performant window manager with smooth gestures and keyboard navigation.',
    learnings: 'Pushed boundaries of creative web UI engineering, windowing state management, and full-stack integration.',
    stars: 25,
    featured: true
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    icon: 'BrainCircuit',
    description: 'Deep Learning, Computer Vision, Speech Processing & Generative AI',
    skills: [
      { name: 'PyTorch', level: 92, experienceYears: '3 yrs', isTopSkill: true, description: 'Neural network training, custom loss functions, model quantization & CUDA acceleration.' },
      { name: 'TensorFlow / Keras', level: 88, experienceYears: '3 yrs', isTopSkill: true, description: 'CNNs, Transfer learning, MobileNet architectures, and TFLite model conversions.' },
      { name: 'Computer Vision (OpenCV/YOLO)', level: 90, experienceYears: '3 yrs', isTopSkill: true, description: 'Object detection, video analytics, spatial landmarks, optical flow & MediaPipe.' },
      { name: 'Generative AI & LLMs (Gemini/LangChain)', level: 89, experienceYears: '2 yrs', isTopSkill: true, description: 'RAG pipelines, multi-agent frameworks, prompt engineering, vector embeddings.' },
      { name: 'Scikit-Learn', level: 94, experienceYears: '3 yrs', description: 'Classification, regression, ensemble methods (XGBoost, Random Forest), clustering.' },
      { name: 'NLP & Hugging Face', level: 85, experienceYears: '2 yrs', description: 'Transformers, BERT fine-tuning, sentiment analysis, speech-to-text processing.' },
      { name: 'WebRTC VLM & Realtime AI', level: 84, experienceYears: '2 yrs', description: 'Low-latency media stream processing, audio spectrum analysis & VLM integration.' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend Development',
    icon: 'Server',
    description: 'Scalable APIs, Event-Driven Services & High-Throughput Gateways',
    skills: [
      { name: 'Python (FastAPI / Flask)', level: 94, experienceYears: '4 yrs', isTopSkill: true, description: 'Asynchronous API endpoints, Pydantic validation, ML service wrapper services.' },
      { name: 'Node.js & Express', level: 90, experienceYears: '3 yrs', isTopSkill: true, description: 'RESTful endpoints, middleware, authentication, streaming response handlers.' },
      { name: 'REST & WebSockets APIs', level: 92, experienceYears: '3 yrs', description: 'Real-time bidirectional communication channels, streaming event pipelines.' },
      { name: 'Microservices & Async Workers', level: 82, experienceYears: '2 yrs', description: 'Task queues, pub/sub architecture, background job processing.' }
    ]
  },
  {
    id: 'frontend',
    name: 'Frontend Engineering',
    icon: 'Layout',
    description: 'Modern Reactive UIs, Motion Design & WebGL Graphics',
    skills: [
      { name: 'React 19 & Next.js', level: 92, experienceYears: '3 yrs', isTopSkill: true, description: 'Component architecture, custom hooks, context state management, SSR.' },
      { name: 'TypeScript', level: 90, experienceYears: '3 yrs', isTopSkill: true, description: 'Strict typing, generic interfaces, API contract guarantees.' },
      { name: 'Tailwind CSS v4', level: 95, experienceYears: '3 yrs', isTopSkill: true, description: 'Utility-first styling, responsive layouts, design token customization.' },
      { name: 'Framer Motion & Motion.dev', level: 88, experienceYears: '2 yrs', description: 'Spring physics animations, layout transitions, gesture handlers.' },
      { name: 'Three.js & WebGL', level: 78, experienceYears: '1.5 yrs', description: '3D scene rendering, ambient lights, camera controls, WebXR.' }
    ]
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    icon: 'Cloud',
    description: 'Containerization, Monitoring & Cloud Deployments',
    skills: [
      { name: 'Docker & Containerization', level: 86, experienceYears: '2 yrs', isTopSkill: true, description: 'Multi-stage Dockerfiles, Docker Compose environment isolation.' },
      { name: 'GCP & Cloud Run', level: 82, experienceYears: '2 yrs', description: 'Serverless container deployment, secret manager, cloud logs.' },
      { name: 'CI/CD Pipelines (GitHub Actions)', level: 84, experienceYears: '2 yrs', description: 'Automated testing workflows, linting checks, auto-deployments.' },
      { name: 'Monitoring & Telemetry', level: 80, experienceYears: '1.5 yrs', description: 'Prometheus metrics, Grafana dashboards, anomaly tracing.' }
    ]
  },
  {
    id: 'databases',
    name: 'Databases & Storage',
    icon: 'Database',
    description: 'Relational, NoSQL & Vector Search Solutions',
    skills: [
      { name: 'PostgreSQL', level: 88, experienceYears: '3 yrs', isTopSkill: true, description: 'Relational queries, index optimization, Prisma ORM, migrations.' },
      { name: 'Vector Databases (FAISS / Chroma)', level: 85, experienceYears: '2 yrs', description: 'Semantic embedding indexing, cosine similarity search for RAG.' },
      { name: 'MongoDB & Redis Cache', level: 82, experienceYears: '2 yrs', description: 'Document stores, in-memory caching, rate limiting.' }
    ]
  },
  {
    id: 'prod-ops',
    name: 'Product Operations & QA',
    icon: 'CheckCircle2',
    description: 'Workflow Automation, Product Analytics & Testing Quality',
    skills: [
      { name: 'Product Operations & Analytics', level: 88, experienceYears: '1 yr', isTopSkill: true, description: 'User feedback triage, metric tracking, operational workflow automation.' },
      { name: 'Automated Testing & QA', level: 85, experienceYears: '2 yrs', description: 'Unit testing, regression suites, API test scripts.' },
      { name: 'Agile & Jira Workflows', level: 90, experienceYears: '2 yrs', description: 'Sprint planning, backlog prioritization, cross-functional engineering alignment.' }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-namaah-atlas',
    role: 'Product Operations Lead Intern',
    company: 'Namaah ATLAS',
    type: 'Internship',
    period: 'May 2026 - Present',
    location: 'Bengaluru, India (Remote)',
    description: 'Established foundational product-operations workflows and designed cross-functional team structures, leading technical onboarding and architectural knowledge transfer.',
    responsibilities: [
      'Established foundational product-operations workflows and designed cross-functional team structures (Frontend, AI Pipeline, Backend), leading technical onboarding and architectural knowledge transfer for new engineers.',
      'Created a centralized operational documentation suite defining core product architecture, subscription ecosystems, credit lifecycle monetization, and strict GitHub engineering collaboration practices.',
      'Orchestrated cross-functional execution across product and technical domains, actively managing dependencies, risk mitigation, and operational readiness to successfully drive the platform’s Alpha release.'
    ],
    achievements: [
      'Successfully drove the platform’s Alpha release by orchestrating cross-functional execution.',
      'Created centralized operational documentation defining core product architecture and monetization.'
    ],
    impactMetrics: [
      { label: 'Workflows', value: 'Established' },
      { label: 'Release', value: 'Alpha Delivered' }
    ],
    skills: ['Product Operations', 'Technical Documentation', 'Cross-Functional Leadership', 'Agile & GitHub Workflows']
  },
  {
    id: 'exp-schneider',
    role: 'Technical Intern (Home Automation & IoT)',
    company: 'Schneider Electric',
    type: 'Internship',
    period: 'Aug 2023 - Sep 2023',
    location: 'Bengaluru, India',
    description: 'Analyzed device telemetry from embedded IoT sensors and developed automated data extraction scripts to improve system reliability.',
    responsibilities: [
      'Analyzed device telemetry from 50+ embedded IoT sensors, identifying 3 hardware failure patterns to improve system reliability using Python data tools and SQL.',
      'Documented 10+ analytical workflows and delivered technical data insights to 4 engineering teams, accelerating hardware troubleshooting response times by 30% across the division.',
      'Developed automated data extraction scripts that processed 5,000+ daily log entries, effectively eliminating manual diagnostic bottlenecks for the core engineering team.'
    ],
    achievements: [
      'Accelerated hardware troubleshooting response times by 30% across the division.',
      'Eliminated manual diagnostic bottlenecks by processing 5,000+ daily log entries automatically.'
    ],
    impactMetrics: [
      { label: 'Response Time', value: '-30%' },
      { label: 'Log Processing', value: '5k+/day' }
    ],
    skills: ['IoT Telemetry', 'Python', 'SQL', 'System Troubleshooting', 'Data Extraction']
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'edu-msrit',
    degree: 'B.E. in Artificial Intelligence & Data Science',
    institution: 'M.S. Ramaiah Institute of Technology, Bengaluru',
    period: '2023 – 2026',
    grade: 'GPA: 7.8',
    description: 'Specialization in Artificial Intelligence, Machine Learning algorithms, Data Science, Neural Networks, Database Systems, and Software Development.',
    coursework: [
      'Artificial Intelligence & Data Science',
      'Machine Learning Algorithms & Predictive Analytics',
      'Deep Learning & Computer Vision',
      'Full-Stack Web Development',
      'Database Management Systems'
    ],
    achievements: [
      'Earned SAP Certified Generative AI Developer and SAP Analytics Cloud Data Analyst credentials.',
      'Achieved UiPath Automation Developer Associate certification.',
      'Core Committee Member for the Wolfpack Disciplinary Committee, successfully organizing 5+ technical events for over 500 attendees.'
    ]
  },
  {
    id: 'edu-aps',
    degree: 'Diploma in Computer Science Engineering',
    institution: 'Acharya Patashala Polytechnic, Bengaluru',
    period: '2020 – 2023',
    grade: 'CGPA: 9.14',
    description: 'Comprehensive computer science education covering programming, data structures, algorithms, databases, web development, and operating systems.',
    coursework: [
      'Computer Science Engineering Fundamentals',
      'Data Structures & Algorithms',
      'Object-Oriented Programming (Java, C)',
      'Database Management Systems',
      'Web Programming & OS'
    ],
    achievements: [
      'Graduated with CGPA 9.14 (First Class with Distinction).',
      'Demonstrated strong technical foundations across computer science subjects.'
    ]
  }
];

export const WALLPAPERS: WallpaperOption[] = [
  // Light Wallpapers
  { id: 'light-silver', name: 'Silver Frost (Light)', type: 'mesh', previewBg: 'bg-gray-200', bgClass: '' },
  { id: 'light-sage', name: 'Sage Minimal (Light)', type: 'mesh', previewBg: 'bg-[#d4dcd2]', bgClass: '' },
  { id: 'light-arctic', name: 'Arctic Blue (Light)', type: 'mesh', previewBg: 'bg-sky-100', bgClass: '' },
  { id: 'light-sand', name: 'Desert Sand (Light)', type: 'mesh', previewBg: 'bg-orange-50', bgClass: '' },
  
  // Dark Wallpapers
  { id: 'dark-obsidian', name: 'Obsidian Grid (Dark)', type: 'mesh', previewBg: 'bg-slate-900', bgClass: '' },
  { id: 'dark-violet', name: 'Midnight Violet (Dark)', type: 'mesh', previewBg: 'bg-indigo-950', bgClass: '' },
  { id: 'dark-space', name: 'Deep Space (Dark)', type: 'mesh', previewBg: 'bg-black', bgClass: '' },
  { id: 'dark-cyber', name: 'Cyber Neon (Dark)', type: 'mesh', previewBg: 'bg-rose-950', bgClass: '' },
];

export const TERMINAL_FILES: Record<string, string> = {
  'about.txt': `SRINIDHI N S - AI & DATA SCIENCE GRADUATE
------------------------------------------------------------
Phone: +91 80736 92802
Email: nssrinidhi72884@gmail.com
Location: Bengaluru, Karnataka
GitHub: https://github.com/Srinidhi-070
LinkedIn: https://www.linkedin.com/in/srinidhi-n-s-270351218

Summary:
Being a recent graduate of AI & Data Science, I consider myself a builder by nature. My technical expertise includes Python, Java, and full-stack development with a wide range of experiences varying from developing predictive ML algorithms to creating end-to-end web applications. I have a character of not leaving a problem alone until I find a suitable and efficient solution to it.`,

  'skills.txt': `TECHNICAL SKILLS (CURRICULUM VITAE):
------------------------------------------------------------
[AI & Data Science]
  - TensorFlow, Keras, Scikit-learn, Pandas, NumPy, OpenCV, MediaPipe, Matplotlib

[Programming & Web]
  - Python, SQL, JavaScript, HTML/CSS, React, Next.js, Node.js, Express.js, Java

[Databases & Tools]
  - MySQL, MongoDB, Git, GitHub, VS Code, Postman, Google Sheets, Coda`,

  'projects.txt': `FEATURED PROJECTS (16 Repositories):
------------------------------------------------------------
1. Emotional Syllabus – Agentic GenAI Tool (Python, Generative AI, LLMs)
2. Cloud AI Anomaly Guardian (FastAPI, Docker, Scikit-learn)
3. AI for Health – Disease Prediction (Python, Scikit-learn, ML)
4. RoadSafe – AI Accident Detection (Computer Vision, ML, TypeScript)
5. GuardianVoice - AI Voice Scam Detection System (PyTorch, FastAPI, WebSockets)
6. Portfolio OS - Interactive Desktop Operating System Portfolio (React 19, Express)`
};
