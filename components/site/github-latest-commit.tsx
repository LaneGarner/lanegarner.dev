type GitHubCommit = {
  html_url: string;
  sha: string;
  commit: {
    message: string;
    committer: {
      date: string;
    } | null;
  };
};

const getLatestCommit = async (): Promise<GitHubCommit | null> => {
  try {
    const response = await fetch(
      "https://api.github.com/repos/LaneGarner/rhythm-fit/commits?per_page=10",
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return null;

    const commits = (await response.json()) as GitHubCommit[];
    return (
      commits.find(
        ({ commit }) => !commit.message.toLowerCase().startsWith("merge "),
      ) ??
      commits[0] ??
      null
    );
  } catch {
    return null;
  }
};

export const GitHubLatestCommit = async () => {
  const latest = await getLatestCommit();

  if (!latest) return null;

  const message = latest.commit.message.split("\n")[0];
  const date = latest.commit.committer?.date
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeZone: "UTC",
      }).format(new Date(latest.commit.committer.date))
    : null;

  return (
    <aside
      className="rounded-card border border-ink-subtle/40 bg-surface p-5 shadow-lift"
      aria-label="Latest Rhythm Fit commit"
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs font-bold uppercase tracking-wide text-ink-muted">
        <span>Latest build note</span>
        {date ? <time dateTime={latest.commit.committer?.date}>{date}</time> : null}
      </div>
      <a
        href={latest.html_url}
        target="_blank"
        rel="noreferrer"
        className="group flex items-baseline justify-between gap-4 font-bold text-ink hover:text-accent"
      >
        <span>{message}</span>
        <span className="shrink-0 font-mono text-xs text-ink-muted group-hover:text-accent">
          {latest.sha.slice(0, 7)} ↗
        </span>
      </a>
    </aside>
  );
};
