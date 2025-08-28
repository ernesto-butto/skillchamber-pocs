# Student Journey Prototype Plan

## 1. Goal
Create a prototype for the student journey, featuring a WhatsApp-like interface for managing conversations (scenes) and challenges (blueprints), with filtering, a scene creation agent, and consistent design with the previous prototype.

## 2. Key Features & Concepts
- **WhatsApp-like Interface:** The main screen will display a list of items, resembling a chat list, where each item represents either a 'Scene' (in-progress or completed conversation) or a 'Challenge' (blueprint not yet personalized into a scene).
- **Scenes vs. Challenges:**
    - **Scenes:** Personalized conversations derived from blueprints, actively being practiced or completed.
    - **Challenges:** Blueprints that a student can choose to personalize into a scene. These are not yet active conversations.
- **Filtering:** The view should be filterable by 'All', 'Scenes', and 'Challenges'.
- **Scene Creation Agent:** A co-creator agent (similar to Lu) that helps students personalize a blueprint into a scene by adding topics, interests, or specific settings (e.g., Star Trek setting).
- **Consistent Design:** The prototype will strictly adhere to the UI design schema and component styles established in the Course Management Prototype (color palette, typography, icons, card-based layout).
- **Entry Point:** The prototype starts after user authentication, presenting the main list view.

## 3. User Flow
1. **User Login:** (Assumed, not prototyped)
2. **Main Dashboard (WhatsApp-like Interface):**
    - Displays a list of 'conversations' (Scenes and Challenges).
    - Each item shows a title, a brief description, and an indicator of its type (Scene/Challenge).
    - Scenes will have a 'Resume' or 'Continue' button/indicator.
    - Challenges will have a 'Create Scene' or 'Personalize' button/indicator.
3. **Filtering:**
    - User can tap on 'All', 'Scenes', or 'Challenges' tabs to filter the list.
4. **Clicking a Scene:**
    - Takes the user to the conversation interface (not prototyped in detail, but implied).
5. **Clicking a Challenge (Blueprint):**
    - Takes the user to the Scene Creation Agent (co-creator agent).
6. **Creating a New Scene from a Blueprint (via '+' icon):**
    - User clicks a '+' icon (e.g., Floating Action Button).
    - A modal or new screen appears, listing available blueprints (challenges).
    - User selects a blueprint.
    - User is taken to the Scene Creation Agent with the selected blueprint pre-loaded.

## 4. UI Components to Adapt/Create
- **Header:** Consistent with previous prototype.
- **Tab Navigation:** 'All', 'Scenes', 'Challenges' (similar to previous segments).
- **Conversation Cards:** New component for displaying both Scenes and Challenges, including:
    - Title
    - Brief description/last message
    - Timestamp/status indicator
    - Type indicator (Scene/Challenge)
    - Action button (Resume/Create Scene)
- **Floating Action Button (FAB):** For creating new scenes from blueprints.
- **Blueprint Selection Modal:** For choosing a blueprint when creating a new scene.
- **Scene Creation Agent Interface:** Similar to SceneLab, but with student-focused prompts and personalization options.

## 5. Technical Considerations
- Re-use existing CSS for colors, typography, and general layout.
- Adapt existing JavaScript patterns for modal handling and dynamic content loading.
- Focus on HTML structure and CSS styling for the new components.

## 6. Next Steps
- Implement the HTML structure for the main student dashboard.
- Style the new conversation cards and filtering tabs.
- Implement the FAB and blueprint selection modal.
- Adapt the Scene Creation Agent (Lu) for student personalization.

