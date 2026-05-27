# Post Processing Workflow — Design Conversation
**Date:** 7 May 2026  
**Participants:** Georgina, Claude  
**Output:** PostProcessing_Workflow.html

---

## Overview

This document records the design interview conducted before building the interactive Post Processing workflow tool. Each question captures the design decision made and the reasoning behind it.

---

## Q1 — What does the Post Processing workflow consist of?

**Answer:** The workflow follows this sequence:

1. Start Instance
2. MobaX
3. Prep Data
4. Annotate Data *(different scripts for Train vs Test)*
5. Review
6. Redo *(if needed)*

---

## Q2 — What scripts/commands are needed at each step?

**Answer:** Commands are confidential. All code blocks in the HTML are left as placeholders (e.g., `[INSERT COMMAND HERE]`) for Georgina to fill in manually. The `--make_extracts` flag is pre-included in all annotation and redo placeholders.

---

## Q3 — Do Train and Test follow the same structure?

**Answer:** Yes — both tabs follow the same step sequence. The difference is at the Annotate Data step, where Train and Test use different scripts. Redo also uses different scripts for Train vs Test.

---

## Q4 — How do the three tabs (Train, Test, Redo) relate?

**Decision:** Option B chosen —

- **Train tab:** Full Train workflow including Train-specific annotation and Train redo
- **Test tab:** Full Test workflow including Test-specific annotation and Test redo
- **Redo tab:** Shortcut tab showing only the redo steps, split into Train Redo and Test Redo sections — for when someone needs to redo without going through the full flow

---

## Q5 — What should the chatbot do?

**Decision:** FAQ-based scripted chatbot. No live AI. Anthropic provided a set of example FAQs; Georgina edits the `FAQ` array in the HTML script section to customise all questions and answers.

---

## Q6 — What should the flowchart visually look like?

**Decision:** Vertical timeline — steps flow top to bottom. Each step is a card on the timeline.

---

## Q7 — What are the style/branding requirements?

| Setting | Value |
|---|---|
| Colour scheme | Blue, purple, ashy blue |
| Dark/light mode | Auto — matches user's OS setting |
| Font | Times New Roman |
| Logo | None |

---

## Q8 — What happens when a user clicks a step?

**Decision:** Jump & highlight — clicking a step in the side navigation panel scrolls the page to that step and highlights it with a purple glow. The timeline stays visible at all times via the persistent left-hand side panel.

---

## Q9 — How many FAQ entries for the chatbot?

**Decision:** 15–25 FAQs across three categories:

- Technical Errors
- Process Questions
- Navigation Help

Final build includes 21 FAQ entries. All editable in the `FAQ` array in the HTML file.

---

## Q10 — How will the team access this tool?

**Decision:** Single self-contained HTML file. No server or internet connection required. Can be shared via shared drive or email, and embedded in Confluence via an HTML macro block.

---

## Q11 — Who is the audience and how technical are they?

**Answer:** Data Services team — not very technical. Each step includes a plain-English description alongside the code placeholder. Critical steps have ⚠️ warning boxes to flag easy-to-miss actions.

---

## Q12 — Are there other critical warnings beyond `--make_extracts`?

**Decision:** Georgina will add additional warnings as needed using the built-in **⚠️ Warning Snippet** tool (bottom-right button in the HTML), which provides ready-made HTML to copy and paste into any step.

Pre-built warnings in the HTML:

- Annotate Data (Train & Test): must include `--make_extracts` or annotations won't save
- Redo (Train & Test): must include `--make_extracts`
- Annotate Data (Test): confirm you are using the Test script, not the Train script
- Redo (Test): confirm you are using the Test redo script, not the Train redo script

---

## Final Specification Summary

| Feature | Detail |
|---|---|
| File type | Single self-contained HTML |
| Tabs | Train, Test, Redo |
| Timeline style | Vertical with jump & highlight |
| Side navigation | Persistent left panel, updates per tab |
| Code blocks | Placeholder text, copy button on each block |
| Warning boxes | Pre-placed on critical steps; custom snippet tool included |
| Chatbot | FAQ-based, 21 entries, 3 categories, fully editable |
| Colour scheme | Blue (#3b82f6), Purple (#8b5cf6), Ashy blue (#94a3b8) |
| Font | Times New Roman |
| Dark/light mode | Auto (CSS `prefers-color-scheme`) |
| Logo | None |
| Deployment | Local HTML file; Confluence-compatible via HTML macro |

---

## Output File

**PostProcessing_Workflow.html** — saved to the PPO PP FlowChart folder.

### How to customise:

- **Add commands:** Find each `[INSERT ... COMMAND HERE]` placeholder and replace with the real command
- **Add warnings:** Click the ⚠️ Warning Snippet button in the tool, copy the HTML, paste inside any step card
- **Edit FAQ answers:** Open the HTML file, find the `const FAQ = [` section in the `<script>` block, and edit the `answer` fields
- **Add FAQ entries:** Copy an existing FAQ object in the array and update the `keys` and `answer` fields
- **Embed in Confluence:** Open the HTML in a browser → View Source → copy all → paste into a Confluence HTML macro block
