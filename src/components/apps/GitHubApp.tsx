import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, ExternalLink, Code2, RefreshCw, Users, BookOpen } from 'lucide-react';
import { useOS } from '../../context/OSContext';

export const GitHubApp: React.FC = () => {
  const { theme } = useOS();
  const isLight = theme === 'vercel-light';

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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2" style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }}>
            <Github className="w-3.5 h-3.5" /> Live Open Source Metrics
          </div>
          <h1 className={`text-2xl font-extrabold `}>GitHub Developer Dashboard</h1>
          <p className={`text-xs mt-1 `}>Real-time repository statistics & activity for Srinidhi-070.</p>
        </div>

        <button
          onClick={fetchGitHubData}
          disabled={loading}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors btn-ghost ${
            'border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-[var(--surface-2)]'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh API
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto" style={{ color: 'var(--accent)' }} />
          <div className="text-xs text-[var(--text-tertiary)] font-mono">Fetching GitHub API data for Srinidhi-070...</div>
        </div>
      ) : error ? (
        <div className="py-20 text-center space-y-3">
          <div className="text-red-500 font-bold">Failed to fetch metrics</div>
          <div className="text-xs text-[var(--text-tertiary)] font-mono max-w-sm mx-auto">
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
                className="w-16 h-16 rounded-2xl border-2 border-[var(--accent-subtle)] shadow-lg object-cover"
              />
              <div>
                <h2 className={`text-xl font-extrabold `}>{data.user.name}</h2>
                <div className="text-xs font-mono text-[var(--accent)]">@{data.user.login}</div>
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
            <div className="p-4 text-center rounded-[24px]" style={{ backgroundColor: '#ff5744', color: '#000000' }}>
              <BookOpen className="w-5 h-5 mx-auto mb-1 text-black" />
              <div className="text-3xl font-black">{data.user.public_repos}</div>
              <div className="text-[11px] font-bold uppercase">Repositories</div>
            </div>
            <div className="p-4 text-center rounded-[24px]" style={{ backgroundColor: '#6b4eff', color: '#ffffff' }}>
              <Star className="w-5 h-5 mx-auto mb-1 text-white" />
              <div className="text-3xl font-black">{data.totalStars}</div>
              <div className="text-[11px] font-bold uppercase">Total Stars</div>
            </div>
            <div className="p-4 text-center rounded-[24px]" style={{ backgroundColor: '#ffcc4d', color: '#000000' }}>
              <Users className="w-5 h-5 mx-auto mb-1 text-black" />
              <div className="text-3xl font-black">{data.user.followers}</div>
              <div className="text-[11px] font-bold uppercase">Followers</div>
            </div>
            <div className="p-4 text-center rounded-[24px]" style={{ backgroundColor: '#d4dcd2', color: '#000000' }}>
              <Code2 className="w-5 h-5 mx-auto mb-1 text-black" />
              <div className="text-3xl font-black">{Object.keys(data.languages || {}).length}</div>
              <div className="text-[11px] font-bold uppercase">Languages</div>
            </div>
          </div>

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
                      <span className="flex items-center gap-1 text-[var(--accent)]">
                        <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-[var(--accent)]">
                      <Star className="w-3 h-3 text-[var(--accent)]" /> {repo.stargazers_count || 0}
                    </span>
                    <span className="flex items-center gap-1 text-[var(--text-tertiary)]">
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

