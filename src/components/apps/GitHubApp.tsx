import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, ExternalLink, Code2, RefreshCw, Users, BookOpen } from 'lucide-react';
import { useOS } from '../../context/OSContext';

export const GitHubApp: React.FC = () => {
  const { theme } = useOS();
  const isLight = theme === 'arctic-light';

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubData = async () => {
    setLoading(true);
    setError(null);
    try {
      const username = 'Srinidhi-070';
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
      ]);
      
      if (!userRes.ok || !reposRes.ok) throw new Error('Failed to load GitHub metrics');
      
      const userData = await userRes.json();
      const allRepos = await reposRes.json();
      
      let totalStars = 0;
      const languages = new Set();
      
      allRepos.forEach((repo: any) => {
        totalStars += repo.stargazers_count;
        if (repo.language) languages.add(repo.language);
      });
      
      const formattedData = {
        user: userData,
        totalStars,
        languages: Array.from(languages),
        repos: allRepos.filter((r: any) => !r.fork).slice(0, 6)
      };
      
      setData(formattedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  return (
    <div className={`p-6 max-w-5xl mx-auto space-y-6 select-none `}>
      {/* Header Bar */}
      <div className={`flex items-center justify-between pb-4 border-b `}>
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-xs font-semibold mb-2">
            <Github className="w-3.5 h-3.5" /> Live Open Source Metrics
          </div>
          <h1 className={`text-2xl font-extrabold `}>GitHub Developer Dashboard</h1>
          <p className={`text-xs mt-1 `}>Real-time repository statistics & activity for Srinidhi-070.</p>
        </div>

        <button
          onClick={fetchGitHubData}
          disabled={loading}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors btn-ghost border ${
            isLight ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-slate-700 text-slate-200 hover:bg-slate-800'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh API
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-purple-400 animate-spin mx-auto" />
          <div className="text-xs text-slate-400 font-mono">Fetching GitHub API data for Srinidhi-070...</div>
        </div>
      ) : error ? (
        <div className="py-20 text-center space-y-3">
          <div className="text-red-500 font-bold">Failed to fetch metrics</div>
          <div className="text-xs text-slate-400 font-mono max-w-sm mx-auto">
            GitHub public API limits unauthenticated requests to 60 per hour. Please try again later.
            <br />
            (Error: {error})
          </div>
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* User Profile Metrics Banner */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={data.user.avatar_url}
                alt="Srinidhi-070 Avatar"
                className="w-16 h-16 rounded-2xl border-2 border-purple-500/30 shadow-lg object-cover"
              />
              <div>
                <h2 className={`text-xl font-extrabold `}>{data.user.name}</h2>
                <div className="text-xs font-mono text-purple-500 dark:text-purple-400">@{data.user.login}</div>
                <p className={`text-xs mt-1 max-w-lg `}>{data.user.bio}</p>
              </div>
            </div>

            <a
              href={data.user.html_url}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg btn-accent shrink-0"
            >
              <Github className="w-4 h-4" /> Open Profile
            </a>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="glass-card p-4 text-center">
              <BookOpen className="w-4 h-4 text-purple-500 dark:text-purple-400 mx-auto mb-1" />
              <div className={`text-2xl font-black `}>{data.user.public_repos}</div>
              <div className={`text-[11px] `}>Public Repositories</div>
            </div>
            <div className="glass-card p-4 text-center">
              <Star className="w-4 h-4 text-amber-500 dark:text-amber-400 mx-auto mb-1" />
              <div className="text-2xl font-black text-amber-500 dark:text-amber-300">{data.totalStars}</div>
              <div className={`text-[11px] `}>Total Stars Earned</div>
            </div>
            <div className="glass-card p-4 text-center">
              <Users className="w-4 h-4 text-cyan-500 dark:text-cyan-400 mx-auto mb-1" />
              <div className={`text-2xl font-black `}>{data.user.followers}</div>
              <div className={`text-[11px] `}>Followers</div>
            </div>
            <div className="glass-card p-4 text-center">
              <Code2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mx-auto mb-1" />
              <div className="text-2xl font-black text-emerald-500 dark:text-emerald-300">{Object.keys(data.languages || {}).length}</div>
              <div className={`text-[11px] `}>Languages Used</div>
            </div>
          </div>

          {/* Repositories List */}
          <div className="space-y-3">
            <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center justify-between `}>
              <span>Public Repositories</span>
              <span className={`text-xs font-mono `}>github.com/Srinidhi-070</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.repos.map((repo: any) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card-interactive p-4 block group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className={`font-bold text-sm transition-colors truncate `}>
                      {repo.name}
                    </div>
                    <ExternalLink className={`w-3.5 h-3.5 shrink-0 transition-colors `} />
                  </div>

                  <p className={`text-xs mt-1.5 line-clamp-2 leading-relaxed `}>
                    {repo.description || "Open source project by Srinidhi N S"}
                  </p>

                  <div className={`flex items-center gap-4 mt-3 pt-2 border-t text-[11px] font-mono `}>
                    {repo.language && (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-300">
                      <Star className="w-3 h-3 text-amber-500 dark:text-amber-400" /> {repo.stargazers_count || 0}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <GitFork className="w-3 h-3" /> {repo.forks_count || 0}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={`py-12 text-center text-xs `}>
          Failed to load live GitHub metrics.
        </div>
      )}
    </div>
  );
};

