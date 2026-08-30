import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/db";
import { getIcon } from "../../utils/iconMap";
import {
  FiCheck, FiX, FiPlus, FiTrash2, FiEdit2, FiStar, FiMail,
  FiCalendar, FiImage, FiUser, FiInfo, FiActivity, FiSettings,
  FiGlobe, FiMapPin, FiLogOut, FiLayout, FiBriefcase, FiUsers,
  FiMessageSquare, FiEye, FiEyeOff, FiFolder, FiPhone, FiAlertCircle,
  FiSearch, FiCheckCircle, FiSave, FiUpload, FiCornerDownLeft
} from "react-icons/fi";

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Database Tables State
  const [classes, setClasses] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [messages, setMessages] = useState([]);
  const [settings, setSettings] = useState({});
  const [media, setMedia] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [logs, setLogs] = useState([]);

  // Filter Sub-States
  const [messageFilter, setMessageFilter] = useState("all"); // all, unread, archived
  const [messageSearch, setMessageSearch] = useState("");
  
  // Selection and Modal State
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [editingClass, setEditingClass] = useState(null);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editingTimeline, setEditingTimeline] = useState(null);
  
  // Creation Form States
  const [newClass, setNewClass] = useState({ id: "", title: "", icon: "GiLotus", image: "", description: "", duration: "", difficulty: "Beginner", schedule: "", instructor: "", benefitsString: "", published: true });
  const [newInstructor, setNewInstructor] = useState({ name: "", role: "", credentials: "", bio: "", image: "" });
  const [newPhoto, setNewPhoto] = useState({ title: "", category: "Yoga", image: "", published: true });
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "", role: "Editor" });
  const [newTimeline, setNewTimeline] = useState({ year: "", title: "", description: "" });
  const [passwordChange, setPasswordChange] = useState({ adminId: "", currentPassword: "", newPassword: "", confirmPassword: "" });

  // Notifications
  const [toast, setToast] = useState(null);

  // Check login and load initial data
  useEffect(() => {
    const user = db.admins.getCurrentUser();
    if (!user) {
      navigate("/admin/login");
    } else {
      setCurrentUser(user);
      loadAllData();
    }
  }, [navigate]);

  const loadAllData = async () => {
    try {
      const [classesVal, scheduleVal, galleryVal, instructorsVal, testimonialsVal, messagesVal, settingsVal, mediaVal, adminsVal, logsVal] = await Promise.all([
        db.classes.getAll(),
        db.schedule.getAll(),
        db.gallery.getAll(),
        db.instructors.getAll(),
        db.testimonials.getAll(),
        db.contact_messages.getAll(),
        db.site_settings.get(),
        db.media_library.getAll(),
        db.admins.getAll(),
        db.activity_logs.getAll()
      ]);
      setClasses(classesVal);
      setSchedule(scheduleVal);
      setGallery(galleryVal);
      setInstructors(instructorsVal);
      setTestimonials(testimonialsVal);
      setMessages(messagesVal);
      setSettings(settingsVal);
      setMedia(mediaVal);
      setAdmins(adminsVal);
      setLogs(logsVal);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = async () => {
    await db.admins.logout();
    navigate("/admin/login");
  };

  const triggerReset = async () => {
    if (window.confirm("Are you sure you want to reset the database to default seed values? All your changes will be lost.")) {
      await db.reset();
      await loadAllData();
      showToast("Database successfully reset to defaults.");
    }
  };

  // Messages helpers
  const toggleMessageRead = async (id, currentVal) => {
    await db.contact_messages.update(id, { read: !currentVal });
    await loadAllData();
  };

  const toggleMessageStarred = async (id, currentVal) => {
    await db.contact_messages.update(id, { starred: !currentVal });
    await loadAllData();
  };

  const toggleMessageArchived = async (id, currentVal) => {
    await db.contact_messages.update(id, { archived: !currentVal });
    await loadAllData();
  };

  const deleteMessage = async (id) => {
    if (window.confirm("Delete this message permanently?")) {
      await db.contact_messages.delete(id);
      await loadAllData();
      if (selectedMessage?.id === id) setSelectedMessage(null);
      showToast("Message deleted.");
    }
  };

  // Image Upload helper (base64)
  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        callback(base64String, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // Class Actions
  const handleCreateClass = async (e) => {
    e.preventDefault();
    if (!newClass.title) return;
    const benefits = newClass.benefitsString.split(",").map(b => b.trim()).filter(Boolean);
    const slug = newClass.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    
    await db.classes.create({
      id: slug,
      title: newClass.title,
      icon: newClass.icon,
      image: newClass.image || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
      description: newClass.description,
      duration: newClass.duration,
      difficulty: newClass.difficulty,
      schedule: newClass.schedule,
      instructor: newClass.instructor,
      benefits,
      published: newClass.published
    });
    
    await loadAllData();
    setNewClass({ id: "", title: "", icon: "GiLotus", image: "", description: "", duration: "", difficulty: "Beginner", schedule: "", instructor: "", benefitsString: "", published: true });
    showToast("Class created successfully!");
  };

  const handleUpdateClass = async (e) => {
    e.preventDefault();
    const benefits = editingClass.benefitsString 
      ? editingClass.benefitsString.split(",").map(b => b.trim()).filter(Boolean)
      : editingClass.benefits;

    await db.classes.update(editingClass.id, {
      title: editingClass.title,
      icon: editingClass.icon,
      image: editingClass.image,
      description: editingClass.description,
      duration: editingClass.duration,
      difficulty: editingClass.difficulty,
      schedule: editingClass.schedule,
      instructor: editingClass.instructor,
      benefits,
      published: editingClass.published
    });
    
    await loadAllData();
    setEditingClass(null);
    showToast("Class updated successfully!");
  };

  const handleDeleteClass = async (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      await db.classes.delete(id);
      await loadAllData();
      showToast("Class deleted.");
    }
  };

  // Timetable Actions
  const handleUpdateScheduleRow = async (rowId, field, value) => {
    await db.schedule.update(rowId, { [field]: value });
    await loadAllData();
    showToast("Schedule row updated!");
  };

  // Gallery Actions
  const handleUploadPhoto = async (e) => {
    e.preventDefault();
    if (!newPhoto.image || !newPhoto.title) {
      showToast("Please upload an image and specify a title.", "error");
      return;
    }
    await db.gallery.create(newPhoto);
    await db.media_library.create(newPhoto.title, newPhoto.image);
    await loadAllData();
    setNewPhoto({ title: "", category: "Yoga", image: "", published: true });
    showToast("Photo added to gallery and media library!");
  };

  const handleToggleGalleryPublish = async (id, currentVal) => {
    await db.gallery.update(id, { published: !currentVal });
    await loadAllData();
  };

  const handleDeletePhoto = async (id) => {
    if (window.confirm("Remove this photo from the gallery?")) {
      await db.gallery.delete(id);
      await loadAllData();
      showToast("Photo deleted.");
    }
  };

  // Instructor Actions
  const handleCreateInstructor = async (e) => {
    e.preventDefault();
    if (!newInstructor.name) return;
    const slug = newInstructor.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await db.instructors.create({
      id: slug,
      ...newInstructor
    });
    await loadAllData();
    setNewInstructor({ name: "", role: "", credentials: "", bio: "", image: "" });
    showToast("Instructor profile added!");
  };

  const handleUpdateInstructor = async (e) => {
    e.preventDefault();
    await db.instructors.update(editingInstructor.id, editingInstructor);
    await loadAllData();
    setEditingInstructor(null);
    showToast("Instructor profile updated!");
  };

  const handleDeleteInstructor = async (id) => {
    if (window.confirm("Are you sure you want to delete this instructor profile?")) {
      await db.instructors.delete(id);
      await loadAllData();
      showToast("Instructor deleted.");
    }
  };

  // Testimonial Actions
  const handleToggleTestimonialApprove = async (id, currentVal) => {
    await db.testimonials.update(id, { approved: !currentVal });
    await loadAllData();
    showToast(`Testimonial ${!currentVal ? 'approved' : 'hidden'}.`);
  };

  const handleDeleteTestimonial = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      await db.testimonials.delete(id);
      await loadAllData();
      showToast("Testimonial deleted.");
    }
  };

  // Site Settings Actions
  const handleSaveAboutSettings = async (e) => {
    e.preventDefault();
    await db.site_settings.update({ about: settings.about });
    await loadAllData();
    showToast("About page settings updated!");
  };

  const handleSaveContactSettings = async (e) => {
    e.preventDefault();
    await db.site_settings.update({ contact: settings.contact });
    await loadAllData();
    showToast("Contact details saved!");
  };

  const handleSaveSEOSettings = async (e) => {
    e.preventDefault();
    await db.site_settings.update({ seo: settings.seo });
    await loadAllData();
    showToast("SEO metadata updated!");
  };

  // Timeline Actions
  const handleCreateTimeline = async (e) => {
    e.preventDefault();
    if (!newTimeline.year || !newTimeline.title) return;
    const items = [...(settings.timeline || [])];
    items.push({
      id: `t-${Date.now()}`,
      ...newTimeline
    });
    await db.site_settings.update({ timeline: items });
    await loadAllData();
    setNewTimeline({ year: "", title: "", description: "" });
    showToast("Timeline event added!");
  };

  const handleDeleteTimeline = async (id) => {
    if (window.confirm("Delete this timeline event?")) {
      const items = settings.timeline.filter(t => t.id !== id);
      await db.site_settings.update({ timeline: items });
      await loadAllData();
      showToast("Timeline event deleted.");
    }
  };

  // Media Library actions
  const handleDeleteMedia = async (id) => {
    if (window.confirm("Delete this file from Media Library? This won't automatically remove references in other database entries.")) {
      await db.media_library.delete(id);
      await loadAllData();
      showToast("Media file deleted.");
    }
  };

  const handleUploadMediaDirect = (e) => {
    handleImageUpload(e, async (base64, name) => {
      await db.media_library.create(name, base64);
      await loadAllData();
      showToast("File uploaded to Media Library!");
    });
  };

  // Admin User Actions
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!newAdmin.username || !newAdmin.password) return;
    const exists = admins.some(a => a.username.toLowerCase() === newAdmin.username.toLowerCase());
    if (exists) {
      showToast("Username already exists.", "error");
      return;
    }
    await db.admins.create({
      username: newAdmin.username,
      passwordHash: newAdmin.password,
      role: newAdmin.role
    });
    await loadAllData();
    setNewAdmin({ username: "", password: "", role: "Editor" });
    showToast("New administrator created.");
  };

  const handleDeleteAdmin = async (id) => {
    const res = await db.admins.delete(id);
    if (res.success) {
      await loadAllData();
      showToast("Administrator removed.");
    } else {
      showToast(res.message || "Failed to remove admin.", "error");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      showToast("New passwords do not match.", "error");
      return;
    }
    const res = await db.admins.updatePassword(passwordChange.adminId, passwordChange.currentPassword, passwordChange.newPassword);
    if (res.success) {
      setPasswordChange({ adminId: "", currentPassword: "", newPassword: "", confirmPassword: "" });
      showToast("Password updated successfully.");
    } else {
      showToast(res.message || "Incorrect password.", "error");
    }
  };

  // Messages Filter & Search
  const filteredMessagesList = messages.filter(m => {
    if (messageFilter === "unread" && m.read) return false;
    if (messageFilter === "archived" && !m.archived) return false;
    if (messageFilter !== "archived" && m.archived) return false;

    if (messageSearch) {
      const q = messageSearch.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex min-h-screen bg-zinc-950 font-sans text-zinc-300">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed right-6 top-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-4 shadow-xl backdrop-blur-md border ${
          toast.type === "error" 
            ? "bg-red-950/80 border-red-500/20 text-red-300" 
            : "bg-emerald-950/80 border-emerald-500/20 text-emerald-300"
        }`}>
          {toast.type === "error" ? <FiAlertCircle className="h-5 w-5" /> : <FiCheckCircle className="h-5 w-5" />}
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-900 bg-zinc-950 flex flex-col shrink-0">
        <div className="h-16 px-6 border-b border-zinc-900 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-serif font-bold text-lg">
            G
          </div>
          <div>
            <h1 className="font-bold text-sm text-white tracking-wider uppercase">Gyan Mandir</h1>
            <p className="text-[10px] text-zinc-500 font-semibold tracking-widest uppercase">Admin System</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {[
            { id: "dashboard", label: "Dashboard", icon: FiLayout },
            { id: "messages", label: "Messages", icon: FiMessageSquare, badge: messages.filter(m => !m.read && !m.archived).length },
            { id: "classes", label: "Classes", icon: FiFolder },
            { id: "schedule", label: "Schedule", icon: FiCalendar },
            { id: "gallery", label: "Gallery", icon: FiImage, badge: gallery.length },
            { id: "instructors", label: "Instructors", icon: FiUser },
            { id: "testimonials", label: "Testimonials", icon: FiStar },
            { id: "about", label: "About Page", icon: FiInfo },
            { id: "contact", label: "Contact & Location", icon: FiMapPin },
            { id: "media", label: "Media Library", icon: FiUpload },
            { id: "seo", label: "SEO Metadata", icon: FiGlobe },
            { id: "admins", label: "Admin Users", icon: FiUsers },
            { id: "logs", label: "Activity Log", icon: FiActivity },
            { id: "settings", label: "Settings", icon: FiSettings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold tracking-wide transition-all ${
                  isActive 
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10" 
                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4.5 w-4.5" />
                  <span>{tab.label}</span>
                </div>
                {tab.badge > 0 && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-indigo-500/10 text-indigo-400"
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="p-4 border-t border-zinc-900">
          <div className="flex items-center justify-between gap-3 p-3 bg-zinc-900/40 border border-zinc-900 rounded-2xl">
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{currentUser?.username || "Admin"}</p>
              <p className="text-[10px] text-zinc-500 font-medium truncate">{currentUser?.role || "Administrator"}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-zinc-500 hover:text-red-400 p-2 hover:bg-zinc-900 rounded-xl transition-all"
              title="Sign Out"
            >
              <FiLogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Body Container */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="h-16 border-b border-zinc-900 bg-zinc-950 px-8 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-bold text-white tracking-wide capitalize">
            {activeTab === "about" ? "About Page Settings" : activeTab === "contact" ? "Contact & Location Settings" : activeTab === "logs" ? "Audit / Activity Logs" : activeTab}
          </h2>
          <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500">
            <span>Server Status: Online</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </header>

        {/* Dynamic Panels */}
        <div className="p-8">

          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white font-serif">Good morning, {currentUser?.username || "Admin"}</h3>
                <p className="text-sm text-zinc-400 mt-1">Here's what's happening at the yoga center today.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Unread Messages", value: messages.filter(m => !m.read && !m.archived).length, color: "text-indigo-400 bg-indigo-500/5 border-indigo-500/10" },
                  { label: "Active Classes", value: classes.length, color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
                  { label: "Gallery Photos", value: gallery.length, color: "text-amber-400 bg-amber-500/5 border-amber-500/10" },
                  { label: "Total Contacts", value: messages.length, color: "text-pink-400 bg-pink-500/5 border-pink-500/10" }
                ].map((stat, i) => (
                  <div key={i} className={`p-6 border rounded-3xl ${stat.color} transition-all`}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{stat.label}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Two Column Section */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Recent Messages */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white tracking-wide">Recent Inquiries</h4>
                    <button onClick={() => setActiveTab("messages")} className="text-xs font-bold text-indigo-400 hover:text-indigo-300">View All</button>
                  </div>
                  <div className="border border-zinc-900 bg-zinc-900/20 rounded-3xl divide-y divide-zinc-900 overflow-hidden">
                    {messages.length === 0 ? (
                      <p className="p-6 text-sm text-zinc-500 text-center">No messages received yet.</p>
                    ) : (
                      messages.slice(0, 4).map(msg => (
                        <div key={msg.id} className="p-5 flex items-center justify-between gap-4 hover:bg-zinc-900/30 transition-all">
                          <div className="min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm truncate">{msg.name}</span>
                              {!msg.read && (
                                <span className="bg-indigo-500 text-[9px] font-bold text-white px-1.5 py-0.5 rounded">NEW</span>
                              )}
                            </div>
                            <p className="text-xs text-zinc-400 font-semibold truncate">{msg.subject}</p>
                            <p className="text-[10px] text-zinc-500 truncate">{new Date(msg.date).toLocaleDateString()} | {msg.email}</p>
                          </div>
                          <button
                            onClick={() => { setSelectedMessage(msg); setActiveTab("messages"); }}
                            className="shrink-0 text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-4 py-2 border border-zinc-800 rounded-2xl"
                          >
                            Read
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <h4 className="font-bold text-white tracking-wide">Quick Actions</h4>
                  <div className="border border-zinc-900 bg-zinc-900/20 p-6 rounded-3xl space-y-3">
                    <button
                      onClick={() => { setActiveTab("classes"); }}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 py-3 text-sm font-bold text-white transition-all shadow-lg"
                    >
                      <FiPlus className="h-4 w-4" /> Add Class
                    </button>
                    <button
                      onClick={() => { setActiveTab("gallery"); }}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 py-3 text-sm font-bold text-zinc-100 transition-all"
                    >
                      <FiUpload className="h-4 w-4" /> Upload Photo
                    </button>
                    <button
                      onClick={() => { setActiveTab("messages"); }}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 py-3 text-sm font-bold text-zinc-100 transition-all"
                    >
                      <FiMail className="h-4 w-4" /> View Messages
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MESSAGES / INQUIRIES */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              {/* Message Filters */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All Messages" },
                    { id: "unread", label: "Unread" },
                    { id: "archived", label: "Archived" }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setMessageFilter(f.id)}
                      className={`px-4 py-2 border rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                        messageFilter === f.id 
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-md" 
                          : "border-zinc-850 bg-zinc-900/40 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500">
                    <FiSearch className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={messageSearch}
                    onChange={(e) => setMessageSearch(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-850 bg-zinc-950 py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-500 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Messages Grid layout */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* List */}
                <div className="lg:col-span-1 border border-zinc-900 bg-zinc-900/10 rounded-3xl divide-y divide-zinc-900 overflow-hidden h-[500px] overflow-y-auto">
                  {filteredMessagesList.length === 0 ? (
                    <p className="p-8 text-sm text-zinc-500 text-center">No messages match search.</p>
                  ) : (
                    filteredMessagesList.map(msg => (
                      <div
                        key={msg.id}
                        onClick={() => setSelectedMessage(msg)}
                        className={`p-4 cursor-pointer transition-all flex items-start justify-between gap-2 ${
                          selectedMessage?.id === msg.id 
                            ? "bg-indigo-600/10 border-l-2 border-indigo-600" 
                            : !msg.read 
                              ? "bg-zinc-900/50" 
                              : "hover:bg-zinc-900/20"
                        }`}
                      >
                        <div className="min-w-0 space-y-1">
                          <p className={`text-sm truncate ${!msg.read ? "font-bold text-white" : "text-zinc-300"}`}>{msg.name}</p>
                          <p className="text-xs text-zinc-400 font-semibold truncate">{msg.subject}</p>
                          <p className="text-[10px] text-zinc-500 truncate">{new Date(msg.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-1">
                          {msg.starred && <FiStar className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
                          {!msg.read && <span className="h-2 w-2 rounded-full bg-indigo-500" />}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Reader */}
                <div className="lg:col-span-2 border border-zinc-900 bg-zinc-900/20 p-6 rounded-3xl flex flex-col justify-between h-[500px]">
                  {selectedMessage ? (
                    <div className="h-full flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-zinc-900 pb-4">
                          <div>
                            <h4 className="text-lg font-bold text-white">{selectedMessage.name}</h4>
                            <p className="text-xs text-zinc-400 mt-0.5">{selectedMessage.email}</p>
                            <p className="text-[10px] text-zinc-500 mt-0.5">Date: {new Date(selectedMessage.date).toLocaleString()}</p>
                          </div>
                          
                          {/* Message Actions */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleMessageStarred(selectedMessage.id, selectedMessage.starred)}
                              className={`p-2 border border-zinc-800 rounded-xl hover:bg-zinc-900 ${
                                selectedMessage.starred ? "text-amber-400 fill-amber-400 border-amber-500/20" : "text-zinc-500"
                              }`}
                              title={selectedMessage.starred ? "Unstar important" : "Star important"}
                            >
                              <FiStar className="h-4.5 w-4.5" />
                            </button>
                            <button
                              onClick={() => toggleMessageRead(selectedMessage.id, selectedMessage.read)}
                              className="p-2 border border-zinc-800 rounded-xl text-zinc-400 hover:bg-zinc-900"
                              title={selectedMessage.read ? "Mark unread" : "Mark read"}
                            >
                              {selectedMessage.read ? <FiMail className="h-4.5 w-4.5" /> : <FiCheck className="h-4.5 w-4.5" />}
                            </button>
                            <button
                              onClick={() => toggleMessageArchived(selectedMessage.id, selectedMessage.archived)}
                              className="p-2 border border-zinc-800 rounded-xl text-zinc-400 hover:bg-zinc-900"
                              title={selectedMessage.archived ? "Send back to Inbox" : "Archive"}
                            >
                              <FiFolder className="h-4.5 w-4.5" />
                            </button>
                            <button
                              onClick={() => deleteMessage(selectedMessage.id)}
                              className="p-2 border border-zinc-800 hover:border-red-500/20 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-zinc-900"
                              title="Delete inquiry"
                            >
                              <FiTrash2 className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        </div>

                        {/* Subject & message text */}
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Subject</p>
                          <p className="text-sm font-semibold text-white mt-1">{selectedMessage.subject}</p>
                        </div>

                        <div className="bg-zinc-950/50 border border-zinc-900 rounded-2xl p-5 overflow-y-auto max-h-[220px]">
                          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Message</p>
                          <p className="text-sm text-zinc-300 leading-6 mt-2 whitespace-pre-wrap">{selectedMessage.message}</p>
                        </div>
                      </div>

                      <div className="border-t border-zinc-900 pt-4 flex justify-end">
                        <a
                          href={`mailto:${selectedMessage.email}?subject=RE: ${selectedMessage.subject}`}
                          className="flex items-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all"
                        >
                          <FiCornerDownLeft className="h-4 w-4" /> Reply via Email
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-3">
                      <FiMail className="h-10 w-10 text-zinc-700" />
                      <p className="text-sm">Select an inquiry from the list to read.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLASSES */}
          {activeTab === "classes" && (
            <div className="space-y-10">
              {/* Grid Classes */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Class Creator Form */}
                <div className="lg:col-span-1 border border-zinc-900 bg-zinc-900/20 p-6 rounded-3xl space-y-6">
                  <h4 className="font-bold text-white text-lg tracking-wide flex items-center gap-2">
                    <FiPlus className="text-indigo-400" /> Add New Program
                  </h4>
                  <form onSubmit={handleCreateClass} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Class Title</label>
                      <input
                        type="text"
                        required
                        value={newClass.title}
                        onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                        placeholder="e.g. Vinyasa Flow"
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Difficulty</label>
                        <select
                          value={newClass.difficulty}
                          onChange={(e) => setNewClass({ ...newClass, difficulty: e.target.value })}
                          className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none cursor-pointer"
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                          <option>All Levels</option>
                          <option>Gentle</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Duration</label>
                        <input
                          type="text"
                          required
                          value={newClass.duration}
                          onChange={(e) => setNewClass({ ...newClass, duration: e.target.value })}
                          placeholder="e.g. 60 Minutes"
                          className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Class Icon</label>
                      <select
                        value={newClass.icon}
                        onChange={(e) => setNewClass({ ...newClass, icon: e.target.value })}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none cursor-pointer font-serif"
                      >
                        <option value="GiLotus">Lotus Icon</option>
                        <option value="GiMeditation">Meditation Icon</option>
                        <option value="GiHeartBeats">Heart Beats Icon</option>
                        <option value="GiWaterDrop">Water Drop Icon</option>
                        <option value="GiRibbonShield">Shield Icon</option>
                        <option value="GiGymBag">Gym Bag Icon</option>
                        <option value="GiInnerSelf">Soul Icon</option>
                        <option value="GiLaurels">Laurels Icon</option>
                        <option value="GiSprout">Sprout Icon</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Instructor Name</label>
                      <select
                        value={newClass.instructor}
                        onChange={(e) => setNewClass({ ...newClass, instructor: e.target.value })}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="">-- Select Instructor --</option>
                        {instructors.map(inst => (
                          <option key={inst.id} value={inst.name}>{inst.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Schedule (Quick display)</label>
                      <input
                        type="text"
                        value={newClass.schedule}
                        onChange={(e) => setNewClass({ ...newClass, schedule: e.target.value })}
                        placeholder="e.g. Mon, Wed, Fri | Morning"
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Image Asset Selection</label>
                      <select
                        value={newClass.image}
                        onChange={(e) => setNewClass({ ...newClass, image: e.target.value })}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="">-- Choose Image from Library --</option>
                        {media.map(file => (
                          <option key={file.id} value={file.url}>{file.name}</option>
                        ))}
                      </select>
                      <div className="mt-2 border-t border-zinc-900 pt-2 flex items-center justify-between">
                        <span className="text-[10px] text-zinc-500 font-semibold">Or upload new photo:</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, (base64) => setNewClass({ ...newClass, image: base64 }))}
                          className="text-[10px] text-indigo-400 file:bg-zinc-900 file:text-indigo-400 file:border-0 file:rounded-xl file:px-2 file:py-1 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Description</label>
                      <textarea
                        value={newClass.description}
                        onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                        placeholder="Detail explanation of the class..."
                        rows={3}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Benefits (Comma separated list)</label>
                      <input
                        type="text"
                        value={newClass.benefitsString}
                        onChange={(e) => setNewClass({ ...newClass, benefitsString: e.target.value })}
                        placeholder="Flexibility, Stress Relief, Calms Mind"
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="published"
                        checked={newClass.published}
                        onChange={(e) => setNewClass({ ...newClass, published: e.target.checked })}
                        className="h-4 w-4 rounded bg-zinc-950 border-zinc-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <label htmlFor="published" className="text-xs font-semibold text-zinc-400 cursor-pointer">Publish on website instantly</label>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all"
                    >
                      <FiSave className="h-4 w-4" /> Save Program
                    </button>
                  </form>
                </div>

                {/* Class List Table */}
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="font-bold text-white text-lg tracking-wide">All Programs ({classes.length})</h4>
                  <div className="border border-zinc-900 bg-zinc-900/10 rounded-3xl overflow-hidden divide-y divide-zinc-900">
                    {classes.map(cls => {
                      const IconComponent = getIcon(cls.icon);
                      return (
                        <div key={cls.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-zinc-900/10 transition-all">
                          <div className="flex items-start gap-4">
                            <div className="w-20 h-16 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shrink-0">
                              <img src={cls.image} alt={cls.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4 text-indigo-400 shrink-0" />
                                <h5 className="font-bold text-white text-sm truncate">{cls.title}</h5>
                                {cls.published ? (
                                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded">PUBLISHED</span>
                                ) : (
                                  <span className="bg-zinc-850 text-zinc-500 text-[9px] font-bold px-1.5 py-0.5 rounded">DRAFT</span>
                                )}
                              </div>
                              <p className="text-xs text-zinc-400 mt-1 font-semibold">{cls.duration} | {cls.difficulty} | Instructor: {cls.instructor || "Not assigned"}</p>
                              <p className="text-[11px] text-zinc-500 line-clamp-2 mt-1.5 leading-5">{cls.description}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 self-end md:self-center shrink-0">
                            <button
                              onClick={() => setEditingClass({ ...cls, benefitsString: (cls.benefits || []).join(", ") })}
                              className="p-2.5 border border-zinc-800 hover:border-indigo-500/20 hover:text-indigo-400 hover:bg-zinc-900 rounded-xl transition-all"
                              title="Edit"
                            >
                              <FiEdit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClass(cls.id)}
                              className="p-2.5 border border-zinc-800 hover:border-red-500/20 hover:text-red-400 hover:bg-zinc-900 rounded-xl transition-all"
                              title="Delete"
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Class Edit Modal Overlay */}
              {editingClass && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="w-full max-w-2xl border border-zinc-850 bg-zinc-900 p-8 rounded-3xl max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                      <h4 className="text-lg font-bold text-white">Edit Program: {editingClass.title}</h4>
                      <button onClick={() => setEditingClass(null)} className="text-zinc-500 hover:text-zinc-300 p-1">
                        <FiX className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <form onSubmit={handleUpdateClass} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Class Title</label>
                          <input
                            type="text"
                            required
                            value={editingClass.title}
                            onChange={(e) => setEditingClass({ ...editingClass, title: e.target.value })}
                            className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Duration</label>
                          <input
                            type="text"
                            required
                            value={editingClass.duration}
                            onChange={(e) => setEditingClass({ ...editingClass, duration: e.target.value })}
                            className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Difficulty</label>
                          <select
                            value={editingClass.difficulty}
                            onChange={(e) => setEditingClass({ ...editingClass, difficulty: e.target.value })}
                            className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white cursor-pointer"
                          >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                            <option>All Levels</option>
                            <option>Gentle</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Class Icon</label>
                          <select
                            value={editingClass.icon}
                            onChange={(e) => setEditingClass({ ...editingClass, icon: e.target.value })}
                            className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white cursor-pointer font-serif"
                          >
                            <option value="GiLotus">Lotus Icon</option>
                            <option value="GiMeditation">Meditation Icon</option>
                            <option value="GiHeartBeats">Heart Beats Icon</option>
                            <option value="GiWaterDrop">Water Drop Icon</option>
                            <option value="GiRibbonShield">Shield Icon</option>
                            <option value="GiGymBag">Gym Bag Icon</option>
                            <option value="GiInnerSelf">Soul Icon</option>
                            <option value="GiLaurels">Laurels Icon</option>
                            <option value="GiSprout">Sprout Icon</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Instructor Name</label>
                          <select
                            value={editingClass.instructor}
                            onChange={(e) => setEditingClass({ ...editingClass, instructor: e.target.value })}
                            className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white cursor-pointer"
                          >
                            <option value="">-- Select Instructor --</option>
                            {instructors.map(inst => (
                              <option key={inst.id} value={inst.name}>{inst.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Schedule (Quick display)</label>
                          <input
                            type="text"
                            value={editingClass.schedule || ""}
                            onChange={(e) => setEditingClass({ ...editingClass, schedule: e.target.value })}
                            className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-zinc-850 pt-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Choose Image from Library</label>
                          <select
                            value={editingClass.image}
                            onChange={(e) => setEditingClass({ ...editingClass, image: e.target.value })}
                            className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white cursor-pointer"
                          >
                            {media.map(file => (
                              <option key={file.id} value={file.url}>{file.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Or Upload New Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (base64) => setEditingClass({ ...editingClass, image: base64 }))}
                            className="mt-2 text-xs text-indigo-400 file:bg-zinc-950 file:text-indigo-400 file:border-0 file:rounded-xl file:px-2 file:py-1 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Description</label>
                        <textarea
                          value={editingClass.description}
                          onChange={(e) => setEditingClass({ ...editingClass, description: e.target.value })}
                          rows={3}
                          className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Benefits (comma-separated)</label>
                        <input
                          type="text"
                          value={editingClass.benefitsString}
                          onChange={(e) => setEditingClass({ ...editingClass, benefitsString: e.target.value })}
                          className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="edit-published"
                          checked={editingClass.published}
                          onChange={(e) => setEditingClass({ ...editingClass, published: e.target.checked })}
                          className="h-4 w-4 rounded bg-zinc-950 border-zinc-800 text-indigo-600 cursor-pointer"
                        />
                        <label htmlFor="edit-published" className="text-xs font-semibold text-zinc-400 cursor-pointer">Published on website</label>
                      </div>

                      <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4">
                        <button
                          type="button"
                          onClick={() => setEditingClass(null)}
                          className="rounded-xl border border-zinc-800 hover:bg-zinc-900 px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SCHEDULE */}
          {activeTab === "schedule" && (
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-white text-lg tracking-wide">Weekly Timetable</h4>
                <p className="text-xs text-zinc-400 mt-1">Assign programs for each day and time slot. Edits save automatically inside the database.</p>
              </div>

              <div className="border border-zinc-900 bg-zinc-900/10 rounded-3xl overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-900 bg-zinc-900/40 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      <th className="p-4 min-w-[150px]">Time Slot</th>
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                        <th key={day} className="p-4 min-w-[130px]">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-xs">
                    {schedule.map(row => (
                      <tr key={row.id} className="hover:bg-zinc-900/5 transition-all">
                        <td className="p-3 font-semibold text-white">
                          <input
                            type="text"
                            value={row.time}
                            onChange={(e) => handleUpdateScheduleRow(row.id, "time", e.target.value)}
                            className="bg-zinc-950/60 border border-zinc-850 focus:border-indigo-500 rounded px-2.5 py-1.5 text-xs text-white max-w-[140px] outline-none"
                          />
                        </td>
                        {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(day => (
                          <td key={day} className="p-3">
                            <select
                              value={row[day]}
                              onChange={(e) => handleUpdateScheduleRow(row.id, day, e.target.value)}
                              className="bg-zinc-950/40 border border-zinc-850 hover:border-zinc-700 focus:border-indigo-500 rounded px-2 py-1.5 text-xs text-zinc-300 w-full outline-none cursor-pointer"
                            >
                              <option value="Rest">Rest</option>
                              {classes.map(cls => (
                                <option key={cls.id} value={cls.title}>{cls.title}</option>
                              ))}
                              {/* Seed non-class programs */}
                              <option value="Special Workshop">Special Workshop</option>
                              <option value="Personal Therapy">Personal Therapy</option>
                              <option value="Spiritual Satsang">Spiritual Satsang</option>
                              <option value="Teacher Training">Teacher Training</option>
                            </select>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: GALLERY */}
          {activeTab === "gallery" && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                
                {/* Image Uploader */}
                <div className="lg:col-span-1 border border-zinc-900 bg-zinc-900/20 p-6 rounded-3xl space-y-6">
                  <h4 className="font-bold text-white text-lg tracking-wide flex items-center gap-2">
                    <FiUpload className="text-indigo-400" /> Upload Photo
                  </h4>
                  <form onSubmit={handleUploadPhoto} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Photo Title</label>
                      <input
                        type="text"
                        required
                        value={newPhoto.title}
                        onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                        placeholder="e.g. Mass Yoga session"
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Category</label>
                      <select
                        value={newPhoto.category}
                        onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none cursor-pointer"
                      >
                        <option>Yoga</option>
                        <option>Meditation</option>
                        <option>Events</option>
                        <option>International Yoga Day</option>
                        <option>Workshops</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Choose Image File</label>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => handleImageUpload(e, (base64) => setNewPhoto({ ...newPhoto, image: base64 }))}
                        className="mt-2 block w-full text-xs text-zinc-400 file:mr-4 file:bg-indigo-600 file:hover:bg-indigo-500 file:text-white file:font-semibold file:border-0 file:rounded-xl file:px-4 file:py-2.5 cursor-pointer file:shadow-md"
                      />
                      {newPhoto.image && (
                        <div className="mt-4 aspect-video rounded-xl overflow-hidden border border-zinc-800">
                          <img src={newPhoto.image} alt="Upload preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="pub-photo"
                        checked={newPhoto.published}
                        onChange={(e) => setNewPhoto({ ...newPhoto, published: e.target.checked })}
                        className="h-4 w-4 rounded bg-zinc-950 border-zinc-800 text-indigo-600 cursor-pointer"
                      />
                      <label htmlFor="pub-photo" className="text-xs font-semibold text-zinc-400 cursor-pointer">Publish on website instantly</label>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all"
                    >
                      <FiSave className="h-4 w-4" /> Save Photo
                    </button>
                  </form>
                </div>

                {/* Grid List */}
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="font-bold text-white text-lg tracking-wide">All Photos ({gallery.length})</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {gallery.map(pic => (
                      <div key={pic.id} className="border border-zinc-900 bg-zinc-900/10 rounded-3xl overflow-hidden group hover:border-zinc-800 transition-all flex flex-col justify-between">
                        <div className="relative aspect-video bg-zinc-950">
                          <img src={pic.image} alt={pic.title} className="w-full h-full object-cover" />
                          <div className="absolute left-3 top-3 flex gap-1.5">
                            <span className="bg-black/50 backdrop-blur-sm text-[9px] font-bold text-white px-2 py-1 rounded-full uppercase tracking-wider border border-white/10">{pic.category}</span>
                            {pic.published ? (
                              <span className="bg-emerald-500/90 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">LIVE</span>
                            ) : (
                              <span className="bg-zinc-800/90 text-zinc-400 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">DRAFT</span>
                            )}
                          </div>
                        </div>
                        <div className="p-4 flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <h5 className="font-bold text-white text-xs truncate">{pic.title}</h5>
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <button
                              onClick={() => handleToggleGalleryPublish(pic.id, pic.published)}
                              className="p-2 border border-zinc-800 hover:bg-zinc-900 rounded-xl text-zinc-400"
                              title={pic.published ? "Unpublish/Draft" : "Publish"}
                            >
                              {pic.published ? <FiEyeOff className="h-3.5 w-3.5" /> : <FiEye className="h-3.5 w-3.5" />}
                            </button>
                            <button
                              onClick={() => handleDeletePhoto(pic.id)}
                              className="p-2 border border-zinc-800 hover:border-red-500/20 hover:text-red-400 hover:bg-zinc-900 rounded-xl text-zinc-500"
                              title="Delete photo"
                            >
                              <FiTrash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: INSTRUCTORS */}
          {activeTab === "instructors" && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Creator Form */}
                <div className="lg:col-span-1 border border-zinc-900 bg-zinc-900/20 p-6 rounded-3xl space-y-6">
                  <h4 className="font-bold text-white text-lg tracking-wide flex items-center gap-2">
                    <FiPlus className="text-indigo-400" /> Create Profile
                  </h4>
                  <form onSubmit={handleCreateInstructor} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Full Name</label>
                      <input
                        type="text"
                        required
                        value={newInstructor.name}
                        onChange={(e) => setNewInstructor({ ...newInstructor, name: e.target.value })}
                        placeholder="e.g. Deepak Mama"
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Role / Designation</label>
                      <input
                        type="text"
                        required
                        value={newInstructor.role}
                        onChange={(e) => setNewInstructor({ ...newInstructor, role: e.target.value })}
                        placeholder="e.g. Lead Yoga Instructor"
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Credentials</label>
                      <input
                        type="text"
                        required
                        value={newInstructor.credentials}
                        onChange={(e) => setNewInstructor({ ...newInstructor, credentials: e.target.value })}
                        placeholder="e.g. Certified Yoga Therapist"
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Instructor Photo</label>
                      <select
                        value={newInstructor.image}
                        onChange={(e) => setNewInstructor({ ...newInstructor, image: e.target.value })}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white cursor-pointer"
                      >
                        <option value="">-- Choose Image from Library --</option>
                        {media.map(file => (
                          <option key={file.id} value={file.url}>{file.name}</option>
                        ))}
                      </select>
                      <div className="mt-2 border-t border-zinc-900 pt-2 flex items-center justify-between">
                        <span className="text-[10px] text-zinc-500 font-semibold">Or upload new:</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, (base64) => setNewInstructor({ ...newInstructor, image: base64 }))}
                          className="text-[10px] text-indigo-400 file:bg-zinc-900 file:text-indigo-400 file:border-0 file:rounded-xl file:px-2 file:py-1 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Bio / Description</label>
                      <textarea
                        value={newInstructor.bio}
                        onChange={(e) => setNewInstructor({ ...newInstructor, bio: e.target.value })}
                        placeholder="Instructor credentials, background, bio..."
                        rows={4}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all"
                    >
                      <FiSave className="h-4 w-4" /> Save Profile
                    </button>
                  </form>
                </div>

                {/* List Grid */}
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="font-bold text-white text-lg tracking-wide">All Instructors ({instructors.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {instructors.map(inst => (
                      <div key={inst.id} className="border border-zinc-900 bg-zinc-900/10 rounded-3xl p-6 flex flex-col justify-between hover:border-zinc-800 transition-all space-y-4">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shrink-0">
                            <img src={inst.image} alt={inst.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-bold text-white text-sm truncate">{inst.name}</h5>
                            <p className="text-xs text-indigo-400 font-semibold mt-0.5">{inst.role}</p>
                            <p className="text-[10px] text-zinc-500 font-semibold truncate mt-0.5">{inst.credentials}</p>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-400 leading-5 line-clamp-3">{inst.bio}</p>
                        <div className="flex gap-2 pt-2 border-t border-zinc-900">
                          <button
                            onClick={() => setEditingInstructor(inst)}
                            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-zinc-850 hover:border-indigo-500/20 hover:text-indigo-400 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400"
                          >
                            <FiEdit2 className="h-3.5 w-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteInstructor(inst.id)}
                            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-zinc-850 hover:border-red-500/20 hover:text-red-400 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-500"
                          >
                            <FiTrash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Edit Modal Instructor */}
              {editingInstructor && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="w-full max-w-xl border border-zinc-850 bg-zinc-900 p-8 rounded-3xl space-y-6 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                      <h4 className="text-lg font-bold text-white">Edit Instructor: {editingInstructor.name}</h4>
                      <button onClick={() => setEditingInstructor(null)} className="text-zinc-500 hover:text-zinc-300 p-1">
                        <FiX className="h-6 w-6" />
                      </button>
                    </div>

                    <form onSubmit={handleUpdateInstructor} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Full Name</label>
                        <input
                          type="text"
                          required
                          value={editingInstructor.name}
                          onChange={(e) => setEditingInstructor({ ...editingInstructor, name: e.target.value })}
                          className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Role</label>
                        <input
                          type="text"
                          required
                          value={editingInstructor.role}
                          onChange={(e) => setEditingInstructor({ ...editingInstructor, role: e.target.value })}
                          className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Credentials</label>
                        <input
                          type="text"
                          required
                          value={editingInstructor.credentials}
                          onChange={(e) => setEditingInstructor({ ...editingInstructor, credentials: e.target.value })}
                          className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-zinc-850 pt-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Choose Image from Library</label>
                          <select
                            value={editingInstructor.image}
                            onChange={(e) => setEditingInstructor({ ...editingInstructor, image: e.target.value })}
                            className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white cursor-pointer"
                          >
                            {media.map(file => (
                              <option key={file.id} value={file.url}>{file.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Or Upload New Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (base64) => setEditingInstructor({ ...editingInstructor, image: base64 }))}
                            className="mt-2 text-xs text-indigo-400 file:bg-zinc-950 file:text-indigo-400 file:border-0 file:rounded-xl file:px-2 file:py-1 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Bio</label>
                        <textarea
                          value={editingInstructor.bio}
                          onChange={(e) => setEditingInstructor({ ...editingInstructor, bio: e.target.value })}
                          rows={4}
                          className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4">
                        <button
                          type="button"
                          onClick={() => setEditingInstructor(null)}
                          className="rounded-xl border border-zinc-800 hover:bg-zinc-900 px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-lg tracking-wide">Testimonials & Reviews</h4>
                  <p className="text-xs text-zinc-400 mt-1">Approve or hide testimonials displayed on the homepage slider.</p>
                </div>
              </div>

              <div className="border border-zinc-900 bg-zinc-900/10 rounded-3xl overflow-hidden divide-y divide-zinc-900">
                {testimonials.map(test => (
                  <div key={test.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-zinc-900/10 transition-all">
                    <div className="min-w-0 space-y-2">
                      <div className="flex items-center gap-3">
                        <h5 className="font-bold text-white text-sm">{test.name}</h5>
                        <span className="text-zinc-500 text-xs">— {test.role}</span>
                        <div className="flex text-amber-400 shrink-0">
                          {Array.from({ length: test.rating }).map((_, i) => (
                            <FiStar key={i} className="h-3 w-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 leading-6 max-w-3xl">"{test.review}"</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                      <button
                        onClick={() => handleToggleTestimonialApprove(test.id, test.approved)}
                        className={`flex items-center gap-1.5 px-4 py-2 border rounded-2xl text-xs font-bold uppercase tracking-wide transition-all ${
                          test.approved 
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                            : "border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                        }`}
                      >
                        {test.approved ? <FiEye className="h-3.5 w-3.5" /> : <FiEyeOff className="h-3.5 w-3.5" />}
                        {test.approved ? "Approved / Live" : "Hidden / Draft"}
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(test.id)}
                        className="p-2 border border-zinc-800 hover:border-red-500/20 hover:text-red-400 hover:bg-zinc-900 rounded-2xl text-zinc-500 transition-all"
                        title="Delete testimonial"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: ABOUT PAGE CONTENT */}
          {activeTab === "about" && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Content Editor */}
                <div className="border border-zinc-900 bg-zinc-900/20 p-8 rounded-3xl space-y-6">
                  <h4 className="font-bold text-white text-lg tracking-wide border-b border-zinc-900 pb-2">Mission, Vision & Philosophy</h4>
                  <form onSubmit={handleSaveAboutSettings} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Mission Statement</label>
                      <textarea
                        value={settings.about?.mission || ""}
                        onChange={(e) => setSettings({ ...settings, about: { ...settings.about, mission: e.target.value } })}
                        rows={3}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Vision Statement</label>
                      <textarea
                        value={settings.about?.vision || ""}
                        onChange={(e) => setSettings({ ...settings, about: { ...settings.about, vision: e.target.value } })}
                        rows={3}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Philosophy Statement</label>
                      <textarea
                        value={settings.about?.philosophy || ""}
                        onChange={(e) => setSettings({ ...settings, about: { ...settings.about, philosophy: e.target.value } })}
                        rows={3}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    
                    <h4 className="font-bold text-white text-sm tracking-wide pt-4 border-t border-zinc-900">Sanctuary Sub-section Text</h4>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Sanctuary Heading</label>
                      <input
                        type="text"
                        value={settings.about?.sanctuaryTitle || ""}
                        onChange={(e) => setSettings({ ...settings, about: { ...settings.about, sanctuaryTitle: e.target.value } })}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Sanctuary Description</label>
                      <textarea
                        value={settings.about?.sanctuaryDesc || ""}
                        onChange={(e) => setSettings({ ...settings, about: { ...settings.about, sanctuaryDesc: e.target.value } })}
                        rows={4}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all"
                    >
                      <FiSave className="h-4 w-4" /> Save About Settings
                    </button>
                  </form>
                </div>

                {/* Timeline Events CRUD */}
                <div className="border border-zinc-900 bg-zinc-900/20 p-8 rounded-3xl space-y-6 flex flex-col justify-between">
                  <div className="space-y-6">
                    <h4 className="font-bold text-white text-lg tracking-wide border-b border-zinc-900 pb-2">Timeline Journey Events</h4>
                    <div className="divide-y divide-zinc-900 overflow-y-auto max-h-[350px] border border-zinc-900 p-2 rounded-2xl bg-zinc-950/20">
                      {(settings.timeline || []).map(time => (
                        <div key={time.id} className="py-4 flex justify-between gap-4 items-start hover:bg-zinc-900/10 px-2 transition-all">
                          <div>
                            <span className="bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/10 text-xs px-2 py-0.5 rounded-full">{time.year}</span>
                            <h5 className="font-bold text-white text-sm mt-1">{time.title}</h5>
                            <p className="text-xs text-zinc-500 mt-1 leading-5">{time.description}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteTimeline(time.id)}
                            className="p-2 border border-zinc-800 hover:border-red-500/20 text-zinc-500 hover:text-red-400 hover:bg-zinc-900 rounded-xl shrink-0"
                            title="Delete timeline slot"
                          >
                            <FiTrash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Timeline Event Form */}
                  <form onSubmit={handleCreateTimeline} className="border-t border-zinc-900 pt-6 space-y-3">
                    <h5 className="font-bold text-white text-xs uppercase tracking-wider text-zinc-400">Add Timeline Milestone</h5>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Year (e.g. 2026)"
                        value={newTimeline.year}
                        onChange={(e) => setNewTimeline({ ...newTimeline, year: e.target.value })}
                        className="block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Milestone Title"
                        value={newTimeline.title}
                        onChange={(e) => setNewTimeline({ ...newTimeline, title: e.target.value })}
                        className="col-span-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <textarea
                      placeholder="Brief description of milestones..."
                      value={newTimeline.description}
                      onChange={(e) => setNewTimeline({ ...newTimeline, description: e.target.value })}
                      rows={2}
                      className="block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 py-3 text-xs font-bold uppercase tracking-wider text-zinc-300"
                    >
                      <FiPlus className="h-4 w-4" /> Add Event
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: CONTACT & LOCATION */}
          {activeTab === "contact" && (
            <div className="max-w-3xl border border-zinc-900 bg-zinc-900/20 p-8 rounded-3xl space-y-6">
              <h4 className="font-bold text-white text-lg tracking-wide border-b border-zinc-900 pb-2">Location & Social Channels</h4>
              <form onSubmit={handleSaveContactSettings} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Postal Address</label>
                    <input
                      type="text"
                      value={settings.contact?.address || ""}
                      onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, address: e.target.value } })}
                      className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Phone Number</label>
                    <input
                      type="text"
                      value={settings.contact?.phone || ""}
                      onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, phone: e.target.value } })}
                      className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Support Email</label>
                    <input
                      type="email"
                      value={settings.contact?.email || ""}
                      onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })}
                      className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">WhatsApp Link (Full Url)</label>
                    <input
                      type="text"
                      value={settings.contact?.whatsapp || ""}
                      onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, whatsapp: e.target.value } })}
                      placeholder="e.g. https://wa.me/9779800000000"
                      className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Facebook URL</label>
                  <input
                    type="text"
                    value={settings.contact?.facebook || ""}
                    onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, facebook: e.target.value } })}
                    className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Google Maps Location Embed URL (iframe src)</label>
                  <input
                    type="text"
                    value={settings.contact?.googleMapsUrl || ""}
                    onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, googleMapsUrl: e.target.value } })}
                    className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Google Maps Navigation Link (Directions URL)</label>
                  <input
                    type="text"
                    value={settings.contact?.directionsUrl || ""}
                    onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, directionsUrl: e.target.value } })}
                    className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="pt-4 border-t border-zinc-900">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all"
                  >
                    <FiSave className="h-4 w-4" /> Save Contact Details
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 10: MEDIA LIBRARY */}
          {activeTab === "media" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
                <div>
                  <h4 className="font-bold text-white text-lg tracking-wide">Central Media Storage</h4>
                  <p className="text-xs text-zinc-400 mt-1">Upload files and grab their Base64 URLs to link in classes, gallery, and instructors.</p>
                </div>
                <div className="shrink-0">
                  <label className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all cursor-pointer">
                    <FiUpload className="h-4 w-4" /> Upload Image File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadMediaDirect}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {media.map(file => (
                  <div key={file.id} className="border border-zinc-900 bg-zinc-900/10 rounded-3xl overflow-hidden group hover:border-zinc-800 transition-all flex flex-col justify-between">
                    <div className="relative aspect-video bg-zinc-950">
                      <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="min-w-0">
                        <h5 className="font-bold text-white text-xs truncate" title={file.name}>{file.name}</h5>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-zinc-900">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(file.url);
                            showToast("Image URL/Base64 copied to clipboard!");
                          }}
                          className="flex-1 rounded-xl bg-zinc-900 hover:bg-zinc-855 border border-zinc-850 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-300"
                        >
                          Copy Reference
                        </button>
                        <button
                          onClick={() => handleDeleteMedia(file.id)}
                          className="rounded-xl border border-zinc-850 hover:border-red-500/20 hover:text-red-400 py-2 px-3 text-zinc-500"
                          title="Delete file"
                        >
                          <FiTrash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: SEO METADATA */}
          {activeTab === "seo" && (
            <div className="max-w-4xl border border-zinc-900 bg-zinc-900/20 p-8 rounded-3xl space-y-6">
              <h4 className="font-bold text-white text-lg tracking-wide border-b border-zinc-900 pb-2">Search Engine Optimization (SEO) & Open Graph Settings</h4>
              <form onSubmit={handleSaveSEOSettings} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="font-bold text-white text-sm border-b border-zinc-900 pb-1 flex items-center gap-2"><FiGlobe className="text-indigo-400" /> Homepage SEO</h5>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 font-sans">Homepage Meta Title</label>
                      <input
                        type="text"
                        value={settings.seo?.homeTitle || ""}
                        onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, homeTitle: e.target.value } })}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Homepage Meta Description</label>
                      <textarea
                        value={settings.seo?.homeDesc || ""}
                        onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, homeDesc: e.target.value } })}
                        rows={3}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-bold text-white text-sm border-b border-zinc-900 pb-1 flex items-center gap-2"><FiGlobe className="text-indigo-400" /> About Page SEO</h5>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">About Page Meta Title</label>
                      <input
                        type="text"
                        value={settings.seo?.aboutTitle || ""}
                        onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, aboutTitle: e.target.value } })}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">About Page Meta Description</label>
                      <textarea
                        value={settings.seo?.aboutDesc || ""}
                        onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, aboutDesc: e.target.value } })}
                        rows={3}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-900">
                  <div className="space-y-4">
                    <h5 className="font-bold text-white text-sm border-b border-zinc-900 pb-1 flex items-center gap-2"><FiGlobe className="text-indigo-400" /> Classes Programs SEO</h5>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 font-sans">Classes Meta Title</label>
                      <input
                        type="text"
                        value={settings.seo?.classesTitle || ""}
                        onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, classesTitle: e.target.value } })}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Classes Meta Description</label>
                      <textarea
                        value={settings.seo?.classesDesc || ""}
                        onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, classesDesc: e.target.value } })}
                        rows={3}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-bold text-white text-sm border-b border-zinc-900 pb-1 flex items-center gap-2"><FiGlobe className="text-indigo-400" /> Schedule Timetable SEO</h5>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Schedule Meta Title</label>
                      <input
                        type="text"
                        value={settings.seo?.scheduleTitle || ""}
                        onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, scheduleTitle: e.target.value } })}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Schedule Meta Description</label>
                      <textarea
                        value={settings.seo?.scheduleDesc || ""}
                        onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, scheduleDesc: e.target.value } })}
                        rows={3}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-900">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all"
                  >
                    <FiSave className="h-4 w-4" /> Save SEO Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 12: ADMIN USERS */}
          {activeTab === "admins" && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Creator */}
                <div className="border border-zinc-900 bg-zinc-900/20 p-8 rounded-3xl space-y-6">
                  <h4 className="font-bold text-white text-lg tracking-wide flex items-center gap-2">
                    <FiPlus className="text-indigo-400" /> Create Administrator
                  </h4>
                  <form onSubmit={handleCreateAdmin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Username</label>
                      <input
                        type="text"
                        required
                        value={newAdmin.username}
                        onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                        placeholder="e.g. lead_editor"
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Password</label>
                      <input
                        type="password"
                        required
                        value={newAdmin.password}
                        onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                        placeholder="••••••••"
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Role / Permissions</label>
                      <select
                        value={newAdmin.role}
                        onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                        className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none cursor-pointer"
                      >
                        <option>Super Admin</option>
                        <option>Editor</option>
                        <option>Moderator</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all"
                    >
                      <FiSave className="h-4 w-4" /> Save User
                    </button>
                  </form>
                </div>

                {/* Reset Password / List */}
                <div className="space-y-6">
                  {/* List admins */}
                  <div className="border border-zinc-900 bg-zinc-900/20 p-8 rounded-3xl space-y-4">
                    <h4 className="font-bold text-white text-lg tracking-wide border-b border-zinc-900 pb-2">Administrators</h4>
                    <div className="divide-y divide-zinc-900">
                      {admins.map(user => (
                        <div key={user.id} className="py-4 flex justify-between items-center gap-4">
                          <div>
                            <p className="font-bold text-white text-sm">{user.username}</p>
                            <p className="text-xs text-zinc-500 font-semibold mt-0.5">Role: {user.role} | Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                          </div>
                          {admins.length > 1 && (
                            <button
                              onClick={() => handleDeleteAdmin(user.id)}
                              className="p-2 border border-zinc-805 text-zinc-500 hover:text-red-400 hover:bg-zinc-900 hover:border-red-500/20 rounded-xl transition-all"
                              title="Delete user"
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Change Password Form */}
                  <div className="border border-zinc-900 bg-zinc-900/20 p-8 rounded-3xl space-y-4">
                    <h4 className="font-bold text-white text-md tracking-wide">Change Password</h4>
                    <form onSubmit={handlePasswordReset} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Select User</label>
                        <select
                          required
                          value={passwordChange.adminId}
                          onChange={(e) => setPasswordChange({ ...passwordChange, adminId: e.target.value })}
                          className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white cursor-pointer"
                        >
                          <option value="">-- Choose Account --</option>
                          {admins.map(user => (
                            <option key={user.id} value={user.id}>{user.username}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Current Password</label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={passwordChange.currentPassword}
                          onChange={(e) => setPasswordChange({ ...passwordChange, currentPassword: e.target.value })}
                          className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">New Password</label>
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={passwordChange.newPassword}
                            onChange={(e) => setPasswordChange({ ...passwordChange, newPassword: e.target.value })}
                            className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Confirm Password</label>
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={passwordChange.confirmPassword}
                            onChange={(e) => setPasswordChange({ ...passwordChange, confirmPassword: e.target.value })}
                            className="mt-2 block w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 py-3 text-xs font-bold uppercase tracking-wider text-zinc-300"
                      >
                        <FiSave className="h-4 w-4" /> Change Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: ACTIVITY LOG */}
          {activeTab === "logs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <div>
                  <h4 className="font-bold text-white text-lg tracking-wide">Activity Logs & Audit Trails</h4>
                  <p className="text-xs text-zinc-400 mt-1">Chronological record of administrative operations made on the database.</p>
                </div>
                <button
                  onClick={async () => {
                    await db.activity_logs.clear();
                    await loadAllData();
                    showToast("Activity logs cleared.");
                  }}
                  className="rounded-2xl border border-zinc-850 hover:border-red-500/20 hover:text-red-400 bg-zinc-900/40 px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400 transition-all"
                >
                  Clear Logs
                </button>
              </div>

              <div className="border border-zinc-900 bg-zinc-900/10 rounded-3xl overflow-hidden divide-y divide-zinc-900 text-xs font-semibold">
                {logs.length === 0 ? (
                  <p className="p-8 text-sm text-zinc-500 text-center">No logs logged yet.</p>
                ) : (
                  logs.map(log => (
                    <div key={log.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-900/5 transition-all">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-white text-sm">{log.action}</span>
                          <span className="bg-zinc-800 text-[10px] text-zinc-400 font-bold px-2 py-0.5 rounded-full">By: {log.admin}</span>
                        </div>
                        <p className="text-zinc-500 text-xs font-normal">{log.details}</p>
                      </div>
                      <span className="text-[10px] text-zinc-600 shrink-0 self-start sm:self-center font-normal">{new Date(log.date).toLocaleString()}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 14: SETTINGS / RESET */}
          {activeTab === "settings" && (
            <div className="max-w-2xl border border-zinc-900 bg-zinc-900/20 p-8 rounded-3xl space-y-6">
              <h4 className="font-bold text-white text-lg tracking-wide border-b border-zinc-900 pb-2">System Diagnostics & Reset Options</h4>
              <div className="space-y-4">
                <div className="p-5 border border-red-500/20 bg-red-500/5 rounded-3xl space-y-3">
                  <h5 className="font-bold text-red-400 text-sm flex items-center gap-2"><FiAlertCircle /> Re-seed & Reset Database</h5>
                  <p className="text-xs text-red-300/80 leading-5">This action will wipe all your custom adjustments (classes created, messages deleted, settings saved) and re-seed the system with the default values defined in `yogaData.js`.</p>
                  <button
                    onClick={triggerReset}
                    className="flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-950/20 transition-all cursor-pointer"
                  >
                    Reset & Re-seed Database
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
