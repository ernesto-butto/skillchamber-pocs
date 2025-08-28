# SkillChamber — Comprehensive Overview

> **Simulated practice at scale, co‑designed with experts.** SkillChamber is a multi‑agent learning engine that turns subject‑matter expertise into adaptive conversational simulations. It powers ready‑made apps (e.g., **LingoStand**) and white‑label solutions for partners who want measurable skill growth through realistic practice, targeted feedback, and teacher/manager insights.

---

## TL;DR

- **What:** A modular engine to build and run **role‑play simulations, tutoring, AI‑guided critique,** and **content co‑creation** experiences.
- **How it works:** A **multi‑agent architecture** (Scenario Creator → Game Master → Evaluator → Insight agents) orchestrates practice, feedback, and analytics. UI is white‑label and mobile‑first.
- **Why it matters:** Simulations are among the most effective ways to learn complex, ill‑structured skills. Generative AI finally makes them **scalable, affordable, and personal**.
- **Who it serves:** Language learners, sales & leadership training, customer service, healthcare, manufacturing, finance, construction, and other domains that benefit from conversational practice and scenario‑based assessment.

---

## 1) Vision & Principles

- **Learning by doing:** Put **realistic practice** at the core; theory supports practice, not the other way around.
- **Relatability = retention:** Scenarios adapt to the learner’s context, goals, and gaps.
- **Teacher‑centered scale:** AI augments instructors with **insights and orchestration**, never replaces them.
- **Expert co‑design:** Each agent/app is built with a domain expert so behaviors, feedback, and rubrics reflect the craft.
- **Safety & transparency:** Clear affordances about AI roles, data use, and model limits; bias and drift testing; guardrails.

---

## 2) Market Context

- Learners and organizations want **hands‑on practice**, not just content. Traditional simulations are effective yet historically **expensive and hard to customize**.
- Generative AI reduces production time, enables **adaptive scenarios**, and surfaces **group‑level insights** so instructors can target follow‑ups.
- Adoption pressure is high across L&D: faster cycles, personalized experiences, and clearer links to performance.

---

## 3) Core Value Proposition

- **Simulated practice at scale:** Role‑plays that feel relevant and challenging, with low risk and high repetition.
- **Adaptive guidance:** Tutors and Game Masters steer difficulty, inject constraints, and keep focus on learning goals.
- **Feedback that matters:** Immediate micro‑corrections + cumulative evaluations and **practice recommendations**.
- **Instructor/Manager insights:** Cohort dashboards that **summarize strengths, gaps, and suggested debriefs**.
- **Fast customization:** Subject‑matter experts co‑create agents; partners can white‑label the UI and content.

---

## 4) Product Stack (High Level)

**Engine (Core Platform)**

- **Multi‑agent orchestration:** ScenarioCreationAgent → GameMasterAgent → EvaluatorAgent → (Progress/Class‑Insights for instructors)
- **LLM interaction handler:** Consistent message format, concept markers (e.g., `[[DIALOG]]`, `[[PLAN]]`, `[[GRADE]]`, `[[FEEDBACK]]`, `[[CORRECTION]]`).
- **State & persistence:** Conversation state (`experimentalState` JSON), agent transitions, performance markers, persistence after early turns to minimize data loss.
- **Backends:** Web services & persistence (Java/Spring). AI/NLP operations (Python/Flask). Storage in SQL (MySQL/PostgreSQL).
- **White‑label UI:** Mobile‑first, modern component library & theming; one frontend serves multiple vertical apps.

**Apps (Powered by the Engine)**

- **LingoStand — Language Learning:** Contextual role‑plays (e.g., negotiation at work, travel, customer support), **immediate corrections**, and end‑of‑session feedback with targeted practice suggestions.
- **NLP (Basic & Pro):** Sales & influence skills taught with **Transpersonal NLP** principles; expert‑crafted prompts, rubrics, and scenarios.
- **Language‑Enabled Upskilling:** Soft‑skills (negotiation, leadership, customer service) practiced in the **target language** or learner’s own language with language‑aware feedback.

---

## 6) Engine Detail (Simplified)

**Agent Roles**

- **ScenarioCreationAgent:** Collects preferences, generates and validates a scenario; sets `move_to_next_agent=true`.
- **GameMasterAgent:** Runs the role‑play; manages turns; provides real‑time corrections and performance grading via concept markers.
- **EvaluatorAgent:** Reads the full interaction; produces comprehensive feedback and **learning recommendations**; ends session.
- **Progress/Class‑Insights (Instructor‑Facing):** Summarize each student’s strengths & areas to improve; then aggregate cohort patterns and propose debrief activities.

**State & Data**

- **Conversation model:** `GptConversation` with metadata (model, type, title, lang, native/target language, messages, `experimentalState`, timestamps).
- **Performance:** Per‑message duration, correction counts, difficulty progression, rubric hits/misses.
- **Transitions:** Each agent implements `can_handle(state)` and sets flags to advance/reset.

**Safety/Guardrails**

- Prompt constraints and internal guidelines (planning, grading, feedback, closing rules).
- **Iteration bounds** (e.g., soft limits per conversation), reset conditions, and retry on malformed outputs.
- Agent‑level testing (harm/bias checks, goal adherence, robustness to off‑track inputs).

---

## 7) Current Verticals

### A) LingoStand — Language Learning

- **Use case:** Conversational practice that mirrors real life (work, travel, services, conflict resolution).
- **Features:** Immediate micro‑corrections; structured feedback; **practice recommendations**; option to enable/disable automatic transcription submission; language functions focus.
- **Outcomes:** Confidence and fluency through repeated, contextualized practice and targeted follow‑ups.

### B) NLP (Basic & Pro)

- **Use case:** Sales, influence, and communication skills using **Transpersonal NLP**; two depth levels.
- **Co‑design:** Built with a recognized NLP expert (e.g., Germán) ensuring behaviors and critiques match the craft.

### C) Language‑Enabled Upskilling

- **Use case:** Negotiation, leadership, customer service — optionally integrated with language goals.
- **Benefit:** One engine builds both **soft‑skill** and **language** capability via the same practice loop.

---

## 8) White‑Label & Integrations

### White‑Label Offering (Buyer Summary & Feature Matrix)

**Who this is for:** Schools, L&D teams, and training providers that want their own brand, domain, and content/IP boundaries—without building an AI simulation engine from scratch.

**What you get:** Your brand, your domain, your content, your learners. SkillChamber runs the simulation engine, safety layers, analytics, and updates.

#### Feature Matrix

| Area                      | Base                                                 | Enhanced                                            | Enterprise                                                |
| ------------------------- | ---------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------------- |
| **Branding & Theming**    | Logo, colors, typography                             | Custom components, multi‑brand per tenant           | Department sub‑brands, advanced theme tokens              |
| **Domains**               | `partner.skillchamber.app` subdomain                 | Custom domain (CNAME) + managed TLS                 | Vanity domains with wildcard + certificate lifecycle mgmt |
| **Tenant Isolation**      | Logical isolation per tenant                         | Dedicated DB schema                                 | Dedicated DB instance + network isolation (VPC)           |
| **Data Residency**        | EU or US region                                      | Region choice per tenant                            | Contractual residency + in‑region backups only            |
| **SSO/IdP**               | Email/Magic link                                     | OIDC (Google/Azure AD), SAML 2.0                    | Advanced claims mapping, SCIM user provisioning           |
| **LMS/LTI**               | LTI 1.3 launch, roster by link                       | Deep‑linking, grade passback                        | Roster sync & Outcomes service, custom roles              |
| **HRIS/ATS**              | CSV import, webhooks                                 | API connectors (Workday, SuccessFactors)            | Bi‑directional sync, custom attribute mapping             |
| **Analytics**             | Standard learner & cohort dashboards                 | Export via REST, scheduled reports                  | Data warehouse connectors (BigQuery, Snowflake)           |
| **Compliance & Security** | DPA, audit logs, role‑based admin                    | SIEM/webhook events                                 | Pen‑testing, bespoke DPAs & DPIAs, named environments     |
| **Observability**         | Admin audit trails                                   | API audit feed                                      | SIEM integrations (Splunk/Datadog)                        |
| **Support & SLAs**        | Email support, 2‑business‑day response, 99.5% uptime | Chat support, 1‑business‑day response, 99.7% uptime | Dedicated CSM, 8×5 or 24×7, 99.9% uptime                  |
| **Custom Agent Packs**    | 1 included                                           | 3 included                                          | Unlimited within SOW                                      |
| **Content Exclusivity**   | Shared artifacts by default                          | Tenant‑exclusive variants                           | Exclusive rights by domain/vertical                       |
| **Deployment Options**    | Managed SaaS (multi‑tenant)                          | Single‑tenant managed                               | VPC/VPN‑peered or private cloud                           |

> **Notes:** The matrix is illustrative. Final options and SLAs are defined in the MSA/SOW.

#### Implementation Playbook (Typical)

- **Week 0–1 — Discovery & Success Plan:** Audience, starter scenarios (2–3), success metrics (e.g., completion ↑, gap‑closure rate, time‑to‑competence).
- **Week 1–2 — Configure & Theme:** Brand kit, domain setup, roles/permissions, data residency selection.
- **Week 1–3 — Integrations:** SSO/IdP, LMS/LTI, (optionally) HRIS. Smoke tests + sandbox users.
- **Week 3–6 — Pilot:** 50–200 learners; enable Insight dashboards; weekly check‑ins; adjust rubrics & difficulty.
- **Week 6–10 — Rollout:** Train facilitators, enable class‑insights at cohort level; success review.
- **Ongoing — Optimize:** New agent packs, targeted drills, KPI reviews each quarter.

#### Pricing Scaffolding (Illustrative)

- **One‑time setup:** Branding, domain, tenant security baseline **3–15k€** (depends on tier/integrations).
- **Subscription:** Tiered **per active learner/month (ALM)** *or* **site license** (e.g., **5–15k€/site/year**) where appropriate.
- **Custom Agent Packs:** **2–10k€** per pack depending on complexity (scenario/rubrics, data adapters, review cycles).
- **Professional Services:** Onboarding, facilitator training, content migration, KPI consulting (T&M or fixed).

#### 1‑Page Buyer Summary (Copy‑Ready)

**Problem:** Traditional role‑plays don’t scale and rarely align with each learner’s context.

**Solution:** A white‑label simulation platform—your brand and domain—delivering adaptive practice, immediate feedback, and instructor‑ready insights.

**Outcomes:** Faster time‑to‑competence, higher completion, clearer gap closure—plus instructor time saved via cohort insights.

**What’s Included:** Branded UI & domain, starter scenarios, insight dashboards, SSO/LTI options, and expert co‑design of custom agent packs.

**Timeline:** Pilot in **3–6 weeks**; rollout by **10 weeks** in typical deployments.

**Security:** Tenant isolation, data‑residency choice, audit logs; enterprise options for VPC and bespoke DPAs.

**Support:** Email/chat support tiers up to dedicated CSM + 24×7 and 99.9% uptime.

**Next Steps:** Pick a tier, choose 2–3 starter scenarios, confirm success metrics and pilot start date.- **Branding:** Full theming, assets, and domain configuration per partner.

- **LMS/LTI:** Minimal integration option (e.g., Moodle) for access control, grade passback, and reporting.
- **APIs:** REST endpoints for scenario creation, session telemetry, and insights export.
- **Compliance & SSO:** Enterprise‑ready options (roadmapped) for HRIS/IdP integration, audit trails, and certification workflows.

---

## 9) Collaboration, IP & Incentives

- **Engine ownership:** Core platform owned/maintained centrally.
- **Co‑creation model:** Experts co‑design agents and content; apps split **revenue 50/50** by default (configurable per deal).
- **Equity for meaningful contributors:** Time/capital contributors may receive equity in the core engine (case‑by‑case); app‑level rev‑share remains independent.
- **Agent artifacts:** Shared by default within the app; exclusivity negotiable depending on contribution scope.

---

## 10) Business Model (Illustrative)

- **White‑label B2B/B2B2C:** One‑off branding fee; per‑active‑learner pricing or annual license.
- **Custom agent packs:** Fixed price per agent/character with scenario/rubric design.
- **Professional services:** Onboarding, content migration, KPI definition, cohort debrief facilitation.
- **Outcomes focus:** Premium justified by completion acceleration, retention improvements, and instructor time saved.

---

## 11) Evidence & Expected Impact (Samples)

- **Completion acceleration:** Interactive simulations show higher completion vs. traditional modules.
- **Productivity gains:** Gen‑AI reduces content ops and instructor overhead.
- **Retention:** Role‑play/tutor models improve knowledge retention over passive modalities.
- **Teacher leverage:** Insight agents help target debriefs and close cohort‑level gaps.

> **Interpretation:** These patterns justify premium licensing (e.g., 5–15k€/year/site) and per‑user pricing bands, especially where compliance, safety, or customer outcomes matter.

---

## 12) Roadmap (Capabilities)

**Current Status — Aug 28, 2025**

- Migration to Angular 18 + Nx completed; core language‑practice features at **feature parity**.
- Validated prototype for **Teacher Authoring** (course creation + scenario templates/blueprints) and **Student Personalization** (adjust scenario variables, goals, and difficulty) ready to implement.

**Next Phase — Implement Validated Prototype (with staged validation)**

- **Phase 1: Authoring MVP.**
  - Course scaffolds, scenario template CRUD, preview, publish/versioning.
  - Roles/permissions for teachers, draft vs. published states.
- **Phase 2: Student Personalization UX.**
  - Template parameters (context, goals, constraints), difficulty ramps, safety/guardrails.
  - Saveable presets and quick‑start blueprints.
- **Phase 3: Feedback & Insights 1.0.**
  - Individual feedback with rubric hits/misses; basic cohort insights for instructors.
- **Phase 4: Pilot & Hardening.**
  - Run pilots with **Language Learning School** and **PNL/NLP partner**; measure outcomes; address gaps; prep for scaled rollout.

**Near‑term (post‑pilot)**

- Unified white‑label frontend refinements and theming packs per tenant
- Minimal **Moodle/LTI** integration; SSO/IdP options
- Expanded Insight dashboards and rubric libraries; certification tracks and **practice‑to‑proficiency** progressions

**Mid‑term**

- Domain‑specific agent kits (healthcare, manufacturing, finance, construction)
- Deeper SSO/HRIS and LMS analytics sync
- Scenario marketplaces and shared content pools for co‑creators
- Enhanced safety layers (bias detectors, content filters, red‑teaming playbooks)

## 12a) Pilot Cadence & Validation Plan

- **Partners:** Language Learning School & **PNL (Transpersonal NLP) partner** (co‑design and evaluator roles).
- **Cadence:** Weekly checkpoints; 2–3 cohorts; 30–60 learners per cohort.
- **Validation steps:**
  1. Define pilot success metrics (completion, time‑to‑competence, rubric mastery, instructor time saved).
  2. Author 3–5 scenario templates per course; collect baseline skills.
  3. Run sessions; compare pre/post and gather qualitative instructor notes.
  4. Iterate templates and feedback prompts; improve personalization defaults.
  5. Final review, go/no‑go for broader rollout.

**Success Metrics (initial):**

- +20–30% scenario completion vs. baseline modules
- ≥15% faster time‑to‑competence on targeted rubrics
- Instructor prep/grading time ↓ by 25–40%
- Learner self‑efficacy (Likert) ↑ by ≥1 point



## 15) Example Flows & Diagrams (Text)

**A) High‑Level Components**

```
Frontend  →  Java/Spring (profiles, conversations)  →  Python/Flask (agents)
           ↘—————————————— SQL persistence (convos, metrics)
```

**B) Agent State Machine (Simplified)**

```
[*] → ScenarioCreation → GameMaster → Evaluator → [*]
        ↘ reset scenario          ↘ END_ROLE_PLAY → Feedback
```

**C) Concept Markers Inside LLM Replies**

```
[[DIALOG]] Learner-facing lines
[[PLAN]]   Next-step intent (hidden)
[[GRADE]]  Performance snapshot
[[FEEDBACK]]Micro‑advice
[[CORRECTION]]Inline language fixes
```

---

## 17) Collaboration & Offers (Examples)

- **Educators/Experts:** 50/50 rev‑share app agreements; we provide engine + co‑dev; you provide curriculum and subject expertise.
- **Investors/Partners:** Equity paths for meaningful platform contributions; white‑label deployments with services.
- **Pilots:** Rapid evaluation of efficacy and fit (3–6 weeks with clear entry/exit criteria and success metrics).

---

## 18) Appendix — Example Prompts & Rubric Seeds (Excerpt)

- **Mentor (Tutor) Prompt:** supports open‑ended guidance without writing answers for the learner; nudges via questions; transitions to practice after a bounded number of interactions.
- **Investor/Opponent Personas:** friendly but probing; persona‑tuned questioning and backstory to elicit missing elements.
- **Evaluator Prompt:** step‑by‑step, rubric‑anchored feedback with concrete improvement advice and practice next steps.
- **Progress/Class Insights:** short per‑student summaries; cohort aggregation into **3 strengths / 3 areas to improve**; debrief suggestions.

---

### One‑Sentence Summary

**SkillChamber turns expert knowledge into adaptive practice that scales—helping learners perform when it counts and helping instructors focus where it matters most.**

