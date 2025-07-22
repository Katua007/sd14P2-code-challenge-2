# Smart Goal Planner 

A simple React application to help users manage multiple savings goals, track progress, allocate deposits, and get an overview of their financial savings.

## Features 

* **Create, Read, Update, Delete (CRUD) Goals:** Add, view, modify, and remove your financial goals.
* **Progress Tracking:** See how much you've saved towards each goal with a visual progress bar.
* **Deposit Management:** Easily add funds to any of your specific goals.
* **Overview Dashboard:** Get a quick summary of total goals, total saved amount, completed goals, and upcoming deadlines.
* **Local Data Persistence:** All your goal data is stored locally using `json-server`.

## Technologies Used 

* **React:** For building the user interface.
* **Vite:** A fast development build tool for React projects.
* **json-server:** To simulate a REST API for local data storage (`db.json`).
* **date-fns:** For easy date manipulation and formatting.

## Setup and Run Locally 

Follow these steps to get the project running on your machine:

1.  **Clone the repository (if applicable) or navigate to your project directory:**
    ```bash
    cd Smart-Goal-Planner
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create `db.json`:**
    In the root of your project, create a file named `db.json` and paste the provided JSON example data into it.

4.  **Start `json-server` (in a separate terminal):**
    This will run your mock API on `http://localhost:3000`.
    ```bash
    npm run server
    ```

5.  **Start the React development server (in another separate terminal):**
    This will typically open the app in your browser at `http://localhost:5174`.
    ```bash
    npm run dev
    ```

  

Now, open your browser to the React development server address (e.g., `http://localhost:5174`) to access the Smart Goal Planner!
