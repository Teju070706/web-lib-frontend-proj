# EduVault - Figma Design Specification

This document provides detailed UI/UX specifications for creating the Figma design for EduVault - an Educational Resource Sharing Platform.

---

## Table of Contents
1. [Brand Identity](#brand-identity)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Page Designs](#page-designs)
   - Landing Page
   - Authentication Page
   - User Dashboard
   - Admin Dashboard
6. [Component Library](#component-library)
7. [Figma Implementation Guide](#figma-implementation-guide)

---

## Brand Identity

### Logo
- **Primary Logo:** "EduVault" with graduation cap icon
- **Icon Only:** Graduation cap in a rounded square
- **Tagline:** "Your Gateway to Educational Excellence"

### Brand Values
- Trustworthy, Educational, Modern, Accessible

---

## Color Palette

### Primary Colors
| Name | Hex Code | Usage |
|------|----------|-------|
| Primary | `#6366F1` | Main buttons, links, accents |
| Primary Dark | `#4F46E5` | Hover states, active elements |
| Primary Light | `#A5B4FC` | Backgrounds, subtle highlights |
| Primary Foreground | `#FFFFFF` | Text on primary colored surfaces |

### Secondary Colors
| Name | Hex Code | Usage |
|------|----------|-------|
| Secondary | `#10B981` | Success states, positive actions |
| Secondary Dark | `#059669` | Secondary hover states |
| Accent | `#F59E0B` | Highlights, warnings, ratings |

### Neutral Colors
| Name | Hex Code | Usage |
|------|----------|-------|
| Background | `#0F172A` | Main background (dark mode) |
| Background Light | `#F8FAFC` | Main background (light mode) |
| Surface | `#1E293B` | Cards, modals (dark mode) |
| Surface Light | `#FFFFFF` | Cards, modals (light mode) |
| Border | `#334155` | Dividers, borders |
| Text Primary | `#F1F5F9` | Main text (dark mode) |
| Text Primary Light | `#0F172A` | Main text (light mode) |
| Text Muted | `#94A3B8` | Secondary text |

### Status Colors
| Name | Hex Code | Usage |
|------|----------|-------|
| Error | `#EF4444` | Error states, destructive actions |
| Warning | `#F59E0B` | Warning states |
| Success | `#10B981` | Success states |
| Info | `#3B82F6` | Information states |

---

## Typography

### Font Families
- **Primary Font:** "Plus Jakarta Sans" (Google Fonts)
- **Monospace Font:** "JetBrains Mono" (for code snippets)

### Font Sizes
| Name | Size | Line Height | Weight |
|------|------|-------------|--------|
| Display | 48px | 1.2 | 800 |
| H1 | 36px | 1.25 | 700 |
| H2 | 30px | 1.3 | 700 |
| H3 | 24px | 1.35 | 600 |
| H4 | 20px | 1.4 | 600 |
| Body Large | 18px | 1.6 | 400 |
| Body | 16px | 1.6 | 400 |
| Body Small | 14px | 1.5 | 400 |
| Caption | 12px | 1.4 | 400 |

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extra Bold: 800

---

## Spacing System

### Base Unit
- Base unit: 4px

### Spacing Scale
| Name | Value |
|------|-------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |
| 4xl | 96px |

### Border Radius
| Name | Value |
|------|-------|
| sm | 4px |
| md | 8px |
| lg | 12px |
| xl | 16px |
| full | 9999px |

---

## Page Designs

### 1. Landing Page

#### Header/Navigation
- **Logo:** Left-aligned with graduation cap icon
- **Navigation Links:** Home, Browse, About, Contact
- **CTA Buttons:** Login (outline), Get Started (primary filled)
- **Height:** 64px
- **Background:** Transparent with blur effect on scroll

#### Hero Section
- **Layout:** Two columns (text left, illustration right)
- **Headline:** "Unlock Knowledge, Share Resources"
- **Subheadline:** "Join thousands of educators and students sharing educational resources"
- **CTA Buttons:** 
  - Primary: "Get Started Free" 
  - Secondary: "Browse Resources"
- **Stats Row:** Total Users, Total Resources, Downloads
- **Background:** Gradient from primary to secondary

#### Features Section
- **Layout:** 3-column grid
- **Features:**
  1. Vast Resource Library - Book, document, video icons
  2. Easy Upload & Share - Cloud upload icon
  3. Community Reviews - Star rating icon
- **Card Style:** Glassmorphism effect, icon + title + description

#### Popular Resources Section
- **Layout:** Horizontal scroll or 4-column grid
- **Card Components:** Resource thumbnail, title, subject badge, download count, rating

#### Testimonials Section
- **Layout:** Carousel with quotes
- **Content:** User avatar, name, role, testimonial text

#### Footer
- **Columns:** Logo & description, Quick Links, Resources, Contact
- **Social Icons:** GitHub, Twitter, LinkedIn
- **Copyright:** Bottom bar

---

### 2. Authentication Page

#### Layout
- **Split Screen:** Form on left, illustration/branding on right
- **Mobile:** Full-width form

#### Login Form
- **Fields:**
  - Email input with envelope icon
  - Password input with lock icon + show/hide toggle
- **Actions:**
  - "Forgot Password?" link
  - Login button (primary)
  - "Don't have an account? Sign up" link
- **Divider:** "or continue with"
- **Social Login:** Google, GitHub buttons

#### Register Form
- **Fields:**
  - Full Name input
  - Email input
  - Password input with strength indicator
  - Confirm Password input
  - Role selector: Student / Teacher / Admin
- **Checkbox:** Terms of Service agreement
- **Actions:**
  - Create Account button
  - "Already have an account? Login" link

#### Design Elements
- **Background:** Subtle gradient or geometric pattern
- **Form Card:** Glassmorphism effect, white/dark surface
- **Input Style:** Rounded borders, icon prefix, focus ring
- **Error States:** Red border, error message below field

---

### 3. User Dashboard

#### Layout
- **Sidebar:** Fixed left, 280px width, collapsible on mobile
- **Main Content:** Fluid width, scrollable

#### Sidebar
- **Logo & User Info:**
  - User avatar (48px circle)
  - Name and email
  - Role badge
- **Navigation Items:**
  - Dashboard (home icon)
  - My Resources (folder icon)
  - Bookmarks (bookmark icon)
  - Downloads (download icon)
  - Settings (gear icon)
- **Bottom:** Theme toggle, logout button

#### Main Content - Dashboard Overview
- **Welcome Section:** "Welcome back, [Name]!"
- **Stats Cards (4 columns):**
  - My Uploads (document icon)
  - Bookmarks (bookmark icon)
  - Downloads (download icon)
  - Storage Used (cloud icon)
- **Recent Activity:** List of recent actions

#### My Resources Tab
- **Header:** "My Uploaded Resources" + Upload button
- **Filters:** Subject, Type, Date range
- **Grid:** Resource cards with edit/delete actions
- **Empty State:** Illustration + "No resources uploaded yet"

#### Bookmarks Tab
- **Header:** "Saved Resources"
- **Layout:** Grid of resource cards with remove bookmark action

#### Downloads Tab
- **Header:** "Download History"
- **List:** Download items with date, resource name, size

---

### 4. Admin Dashboard

#### Layout
- **Sidebar:** Same as user dashboard but with admin navigation
- **Main Content:** Tab-based navigation

#### Sidebar Admin Items
- Overview
- Resources Management
- Users Management
- Analytics
- Settings

#### Overview Tab
- **Stats Cards:**
  - Total Resources
  - Total Users
  - Total Downloads
  - Average Rating
- **Recent Uploads Table:** Title, Subject, Type, Downloads, Rating, Actions
- **Quick Actions:** Add Resource, View Reports

#### Resources Management Tab
- **Header:** "All Resources" + Add Resource button
- **Search Bar:** Full-width search
- **Table Columns:**
  - Checkbox
  - Title
  - Subject
  - Type
  - Uploader
  - Downloads
  - Rating
  - Date
  - Actions (View, Edit, Delete)
- **Bulk Actions:** Delete selected, Export

#### Add/Edit Resource Modal
- **Fields:**
  - Title (text input)
  - Description (textarea)
  - Subject (dropdown)
  - Type (dropdown: Textbook, Research Paper, Study Guide, Video, Article)
  - Grade Level (dropdown)
  - File Upload (drag & drop zone)
  - Tags (multi-select or comma-separated)
  - Visibility (public/private toggle)
- **Actions:** Save, Cancel

#### Users Management Tab
- **Table:** Name, Email, Role, Joined Date, Status, Actions
- **Actions:** Edit Role, Suspend, Delete

#### Analytics Tab
- **Charts:**
  - Monthly Downloads (bar chart)
  - Resource Types Distribution (pie chart)
  - Top Subjects (horizontal bar)
  - User Growth (line chart)
- **Metrics Cards:** Growth rate, Popular subjects, Engagement rate

---

## Component Library

### Buttons
```
Primary Button
- Background: Primary (#6366F1)
- Text: White
- Border Radius: 8px
- Padding: 12px 24px
- Hover: Primary Dark (#4F46E5)
- Active: Scale 0.98
- Disabled: Opacity 50%

Secondary Button
- Background: Transparent
- Border: 1px solid Primary
- Text: Primary
- Hover: Primary/10 background

Ghost Button
- Background: Transparent
- Text: Muted
- Hover: Secondary background

Icon Button
- Size: 40px x 40px
- Border Radius: 8px
- Icon: 20px
```

### Input Fields
```
Text Input
- Height: 44px
- Border: 1px solid Border color
- Border Radius: 8px
- Padding: 0 16px
- Focus: Primary border, shadow

Textarea
- Min Height: 120px
- Resize: Vertical

Select/Dropdown
- Same as Text Input
- Chevron icon on right
- Dropdown: Surface background, 8px radius

Checkbox
- Size: 20px
- Border Radius: 4px
- Checked: Primary background, white checkmark

Toggle Switch
- Width: 44px
- Height: 24px
- Knob: 20px circle
- On: Primary background
```

### Cards
```
Resource Card
- Width: 280px (grid) / 100% (list)
- Border Radius: 12px
- Background: Surface
- Shadow: 0 4px 6px rgba(0,0,0,0.1)
- Hover: Translate Y -4px, increased shadow

Stats Card
- Padding: 24px
- Icon: 24px in colored circle
- Value: Display font, bold
- Label: Body text, muted
```

### Modals/Dialogs
```
- Overlay: Black 50% opacity
- Content: Surface background
- Border Radius: 16px
- Max Width: 500px (small), 700px (medium), 900px (large)
- Header: Title + Close button
- Footer: Action buttons right-aligned
```

### Navigation
```
Top Navigation
- Height: 64px
- Logo left, links center, actions right
- Sticky on scroll with backdrop blur

Sidebar
- Width: 280px (desktop) / Full (mobile drawer)
- Background: Surface
- Items: Icon + Label, 48px height
- Active: Primary background 10%, Primary text
- Hover: Secondary background

Breadcrumb
- Separator: Chevron right
- Current: Muted text
- Links: Primary text
```

---

## Figma Implementation Guide

### Getting Started
1. Open Figma and create a new project
2. Set up design tokens using Variables:
   - Colors (Primary, Secondary, Surface, etc.)
   - Typography (Font families, sizes, weights)
   - Spacing (4px base unit)
3. Create a Color Style for each color
4. Create Text Styles for each typography variant

### Component Creation Order
1. **Primitives:**
   - Buttons (Primary, Secondary, Ghost, Icon)
   - Inputs (Text, Textarea, Select, Checkbox, Toggle)
   - Badges
   - Avatars

2. **Layout Components:**
   - Cards (Resource Card, Stats Card)
   - Modals/Dialogs
   - Navigation (Top nav, Sidebar)
   - Footer

3. **Page Components:**
   - Landing Page sections
   - Auth forms
   - Dashboard layouts
   - Tables

### Responsive Breakpoints
- Mobile: 0 - 639px
- Tablet: 640px - 1023px
- Desktop: 1024px+

### Naming Convention
- Use clear, descriptive names
- Example: `Button/Primary`, `Input/Text`, `Card/Resource`

### Auto Layout
- Use Auto Layout for all components
- Set proper constraints for responsiveness
- Use "Fill container" for expandable elements

---

## Design Files to Export

For developers, export:
1. **Figma file link** - Main project
2. **PDF specification** - This document
3. **Asset exports:**
   - Logo (SVG, PNG @1x, @2x, @3x)
   - Icons (SVG)
   - Illustrations (SVG, PNG)

---

*Last Updated: Auto-generated for EduVault Project*
*Version: 1.0*
