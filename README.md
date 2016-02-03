# portfolio

class-01:
# Your professional online presence

The portfolio site that you create will highlight your projects and your interests, and showcase your skills to potential employers or clients.

You will create, from scratch, a static portfolio site (no "backend server" code required), to represent your personal online presence.

Some hints to get going:

- Start a fresh new repository for this project on GitHub.
- This app will be structured very similarly to the blog code you worked with in your pair assignment.
- Start with a **rough** pen & paper "wireframe" sketch of what you want your portfolio site to look like.
- Work through as many of the user stories as you can, but always submit what you have by the due date. Don't let "if only..." ideas keep you from turning something in!
- Add the [.eslintrc](https://github.com/codefellows/sea-301d1/blob/master/.eslintrc) config file to the root of your repo, so we are all on using the same linter settings.

## User Stories: Minimum Viable Product (MVP)
Let these user stories guide your development:
 1. As a developer, I want my site to use valid and semantic markup, so that employers will love me.
 - As the creator, I want the page to link to my social and GitHub pages, so that visitors can follow me, and I can build my audience.
 - As a developer, I want portfolio items displayed with a repeatable template, so that I can reuse it, and abstract out the details for individual projects.

## User Stories: Stretch Goals
1. As a visitor, I want the site to look reasonable, so that I can read it on any device.
1. As a visitor, I want the portfolio to show the newest projects on top so that I can easily see the developers recent work.
- As a visitor, I want relative timestamps on projects to give me a idea of how many days ago something was created.


## Technical Requirements and Grading Rubric

  - Use good Object Oriented code: Create a constructor function for projects.
  - Leave as little in the `window` (global) namespace as possible: attach functions to objects, etc.
  - Use jQuery to `clone` the example markup for each project, as you add additional content.
  - Your Project prototype should have a `.toHtml()` function that adds new data to the DOM.
  - To make it look better, include basic styles: a css reset, content in a single centered column, reasonable margins, etc.



class-02:
# Portfolio assignment for class 2

Continue building and improving your portfolio site. Here's how you can leverage events:

Adapt these stories as necessary to fit how you want to build your portfolio.

## User Stories: MVP
  1. As the creator, I want the Home and About nav links to act as tabs, so my story is revealed FAST.
    - This means your links to NOT navigate to a new page.
    - Instead, your "single page app" shows only the section related to the navigation tab that is selected.
    - You can use data- attributes to associate a content section with a particular tab
    - Then use jQuery so when the tab is clicked, you hide all the sections, then reveal the associated section only.
  1. As a reader, I want the portfolio to use a nice color scheme, so that it stands out visually.

## User Stories: Stretch Goals
  1. As a reader, I want project descriptions truncated to the first paragraph so that I can easily scroll though the whole list.
  1. As a reader, I want to click the "More" button so that I can expand the entire description.
  1. As a reader, I want projects filterable by category so that I can review just the things that interest me.

## Technical Requirements and Grading Rubric
  - Use event delegation whenever appropriate.
  - Add your filters to the Nav section.
  - Do as much work as you can with advanced selectors, rather than littering your markup with classes and ids.
  - When classes and IDs are needed, pick semantic names. There is to be no `$('#content .content')` nonsense!
  - Add color and icons where appropriate.




Class-03:
# Portfolio Assignment for Class 3 - Mobile-First and Responsive Design

Follow along with these user stories to make sure your portfolio looks good on any sized device.

Adapt these stories as necessary to fit how you want to build your portfolio.

## User Stories: MVP
  1. As a visitor, I want the images to be responsive, so that content stays properly proportioned.
  1. As a visitor, I want the viewport properly sized, so that content fits all the size I have available.
  1. As a visitor, I want the primary nav to be responsive, so that I can get around using any device.

## User Stories: Stretch Goals (adapt to fit your portfolio's design)
  1. As a visitor, I want to see projects one per row on mobile, so that I can read the detail easily.

## Technical Requirements and Grading Rubric
 - Be sure to use proper `viewport` settings.
 - Use mobile-first design principles when adding CSS.
 - Add new styles in any media queries as needed to make the page look good on desktop screens.
 - For bonus points, include styles for tablet displays, as well as desktop.
