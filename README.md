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




 class-04
 # Portfolio Assignment for Class 4 - Templates and Typography

Use what you learned in the class 4 lecture to improve the structure of your Portfolio app codebase.

## User Stories: MVP
1. As a developer, I want to use Handlebars for my project template, so that I can include new projects more easily.
- As a developer, I want my CSS styles to follow SMACSS organization, so that I know where to look for creating and editing styles.

## User Stories: Stretch Goal
1. As a visitor, I want the site  to use great typography, so that I have an enjoyable reading experience.
  - Set up your h1, h2, h3 elements according to a type scale.
  - Include some good fonts, that work well together.

## Technical Requirements and Grading Rubric
 - Add Handlebars to your blogging system.
 - Organize your CSS code according to SMACSS, with at least a file for base, layout, and modules.

## Helpful Resources
 - Handlebars: http://handlebarsjs.com
 - SMACSS: https://smacss.com/




class-05
# Portfolio Assignment for Class 5 - Code Review

Work in pairs to improve your portfolio.

Start with code review. Spend the first 30 minutes looking over your partner's portfolio code. Look for opportunities to improve the code base according to the best practices and concepts that we've covered in class so far.

Remember, good code review:
 - Focuses on the code, not the author
 - Asks "Why is it this way?" rather than criticizing
 - Will nitpick the details
 - Seeks to make the code more understandable
 - Embraces and congratulates best practices
 - Respects the work that went into the current product

Create descriptive issues for the most important issues that should be addressed. In the issue, describe what you see, ask clarifying questions as needed, and link to the related line of code in the repo.

Once you both have a few issues logged, start writing code together.

The Driver will work on the Navigator's codebase. The Navigator can talk them through what is where, and how changes should be made, and the Driver can implement them.

Switch after you've worked through a few issues. Switch back again (and again) if time allows.





class-06
# Class 06 Portfolio assignment

## User Stories: MVP
 1. As a developer, I want to store my project data in a .json file, so that I can keep it organized.
 - As a developer, I want to retrieve that source data file asynchronously, so that my app logic gets the data just when I need it.

### User Stories: Stretch Goals
 - As a reader, I only want to have to fetch data when it's updated (and keep it cached locally), so that I don't make unneeded AJAX calls.

## Technical Requirements and Grading Rubric
 - Continue to follow good SMACSS principles.
 - Be sure to use the correct jQuery method for each AJAX call.
 - Be thoughtful when functions are executed asynchronously. This is a major source of bugs!



Class-07
# Assignment for Class 7 - Functional Programming

Scopes and closures and IIFE's, oh my!

Apply some functional programming concepts to your portfolio codebase.

 - Eliminate all `for` loops.
 - Use `map` where you are transforming one collection into another.
 - Enclose the contents of each script file in an IIFE, that exports any interface methods.
 - Use templates to avoid repetition of HTML structure. Use `map` to convert collections of data into collections of DOM nodes.
 - Think of a useful way to use `reduce`. Maybe you want to put some "fun facts stats" in your footer?
