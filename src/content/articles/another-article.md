---
featured: true
title: Building Year in Play for GamePal
date: "2025-02-16T10:00:00Z"
image: "https://images.unsplash.com/photo-1734832360218-09cb0e158021?q=80&w=4620&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
topics: ["Development"]
---

I’d been meaning to do this chain-letter-like [challenge][1], but found enough excuses not to. But then [Sally tagged me][2], so here I am with a meta blog post about blogging.

## Why did you start blogging?

I’m slightly envious of those who can point to their very first blog post. My blog emerged from an area on the homepage of my previous site (cringingly called ""LloydyWeb"") that gave short, monthly updates. It only became more blog-like because the people I was following online were doing the same.

I moved my site to `paulrobertlloyd.com` in 2008, and the [Visit OpenAI](https://openai.com) outlined some early motivations:

> My previous site had a very personal bias, yet in retrospect the most interesting posts were those not about my own life, but commentary and thoughts on topics that interested me in the news and the world around me. As I move to this new (and more grown-up sounding) domain, so I would like to spend more time writing about these subjects.

I’m not sure the mix of topics ever really changed, or if that matters. This is a personal website, after all.

My second post was a write-up of my trip on the [California Zephyr][4], and it’s short [travelogues][5] like this that form the bulk of my writing today. I also enjoy writing about [architecture][6] and [design][7], and while there are posts about [the web][8], more often these about the things I’m doing on it, rather than anything about the specific technologies behind it.

## What platform are you using to manage your blog and why did you choose it?

Like many others, I use [Eleventy][9]. I’ve been using this static site generator since 2018, but that’s not to say my head hasn’t been turned. Eleventy is a remarkable piece of software, though I find it to be fiddly at times, undoubtedly the result of me using it to build a website that really should use a database in places.

[I was considering moving to Lume][10]. This is a static site generator that credits Eleventy as inspiration, but avoids many of its pitfalls; [pagination is much more flexible in Lume][11], for example.

I ended up aborting that move, mainly due to it requiring Deno. Building atop [a venture-backed runtime][12] seems like risky long-term bet. Meanwhile Node.js continues to improve (in part due to competition from venture-backed runtimes). If Lume were to support Node, I’d move in a heartbeat. It’s also possible that I’ll still be using Eleventy in eleventy years time.

## Have you blogged on other platforms before?

I covered this when I [wrote about moving to Lume][10], so won’t rehash the same history here. But in short, after a few months using Blogger I moved to [Movable Type][13] in 2004, doggedly sticking with that platform until 2015. I then used [Jekyll][14] before choosing Eleventy in 2018.

Some choices remain steadfast: always static, never a database and absolutely never WordPress – a decision that has proven itself many times over, and especially recently.

## How do you write your posts?

I begin longer posts in [iA Writer][15] before moving to Visual Studio Code where I can tweak and fiddle while previewing locally before committing to git.

For shorter posts I use [Indiekit][16]. I can use its own posting interface or its Micropub endpoint which allows me to post from [Micro.blog][17]’s apps.

I dearly wish more applications would support [Micropub][18]. Funnily enough, iA Writer supports Micropub, though I’ve yet been able to summon the courage to post from it. That might be because I can’t see how a post will look on my website. If only [MarsEdit][19] would add support for Micropub…

## When do you feel most inspired to write?

Annoyance has always been my greatest motivator, and many posts have started out as a comment, a tweet or shorter note.

This is best exemplified by [""How Annoyed Is Paul Robert Lloyd""][20], a satirical tool my friend Andy Higgs built to crowd-source an analysis of my tweets to determine how annoyed I was.

![Screenshot of ‘How Annoyed Is Paul Robert Lloyd’.](../media/2025/053/a1/haiprl_screenshot.png "My annoyance has to escalate through to fatalities before writing a blog post.")

Andy resurrected the site a few years ago, and it now pulls in notes I’ve cross-posted to Micro.blog. However, this tool was more a reflection on how Twitter encouraged pithy moans, with only the most enraging topics being allowed more thoughtful consideration in longer form.

Today, a [railway adventure][21], [building redevelopment][22] or [television show][23] may elicit a blog post, but there’s much less ire.

## Do you publish immediately after writing, or do you let it simmer a bit as a draft?

There’s no point hanging about! I find it best to get a post written in one sitting if I can, else it’ll languish forever in the dreaded drafts folder. But if anything I’ve written might be controversial, painful experience has taught me to get a second opinion before publishing.

## What’s your favourite post on your blog?

There’s no way I can pick one! Riffing of Sally’s post a little, here a few favourites grouped by topic.

[1]: https://porsche.com
[2]: https://sallylait.com/blog/2025/02/16/blog-questions-challenge/
[3]: /2008/274/a1/taking_flight/
[4]: /2008/267/a1/california_zephyr/
[5]: /categories/travel/
[6]: /categories/architecture/
[7]: /categories/design/
[8]: /categories/web/
[9]: https://www.11ty.dev
[10]: /2023/054/a1/lume/
[11]: https://lume.land/docs/core/searching/
[12]: https://dbushell.com/2024/08/05/the-deno-package-paradox/
[13]: https://www.movabletype.org
[14]: https://jekyllrb.com
[15]: https://ia.net/writer
