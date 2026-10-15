import React from 'react';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left side: Space/Feng Shui Image Theme */}
      <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
        {/* Artistic space/feng shui background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black animate-pulse" />
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        
        <div className="relative z-10 text-center space-y-6 p-8 backdrop-blur-sm bg-black/20 rounded-3xl border border-white/5">
          <h1 className="text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
            Tâm An AI
          </h1>
          <p className="text-xl text-gray-300 font-light">Không gian chữa lành của riêng bạn</p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-bl from-gray-900 to-black relative overflow-hidden">
        {/* Moving background gradient placeholder for 3D vibe */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent opacity-60 blur-3xl rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent opacity-60 blur-3xl rounded-full"></div>

        {/* Glassmorphism Form Container */}
        <div className="relative z-10 w-full max-w-md p-10 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[2rem] shadow-2xl transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold mb-3">Chào mừng trở lại</h2>
            <p className="text-gray-400 text-sm">Đăng nhập để tiếp tục hành trình nuôi dưỡng tâm hồn</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-300 ml-1 font-medium">Email</label>
              <input 
                type="email" 
                className="w-full px-5 py-3.5 rounded-2xl bg-black/40 border border-white/5 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500 shadow-inner"
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300 ml-1 font-medium">Mật khẩu</label>
              <input 
                type="password" 
                className="w-full px-5 py-3.5 rounded-2xl bg-black/40 border border-white/5 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500 shadow-inner"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm pt-2">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="rounded bg-black/40 border-white/10 text-purple-500 focus:ring-purple-500/50" />
                <span className="text-gray-400 group-hover:text-white transition-colors">Ghi nhớ tôi</span>
              </label>
              <a href="#" className="text-purple-400 hover:text-purple-300 hover:underline transition-all">Quên mật khẩu?</a>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 mt-6 rounded-2xl bg-gradient-to-r from-purple-600/80 to-indigo-600/80 text-white font-medium hover:from-purple-500 hover:to-indigo-500 focus:outline-none transition-all duration-300 hover:shadow-[0_0_25px_rgba(167,139,250,0.6)] active:scale-[0.98] border border-white/10"
            >
              Đăng nhập
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Chưa có tài khoản? <a href="#" className="text-purple-400 hover:text-purple-300 hover:underline transition-all font-medium">Đăng ký ngay</a>
          </p>
        </div>
      </div>
    </div>
  );
}
