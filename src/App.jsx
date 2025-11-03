import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accordian from "./components/Accordian/accordian";
import AutoCompleteSearch from "./components/AutoCompleteSearch/autoCompleteSearch";
import Chess from "./components/Chess/chess";
import InfinateScroll from "./components/InfinateScroll/infinateScroll";
import Chips from "./components/InputChips/chips";
import Pagination from "./components/Pagination/pagination";
import Projects from "./components/Projects/projects";
import TransferList from "./components/TransferList/transferList";
import ProgressBar from "./components/ProgressBar/progressBar";
import "./index.css";
import StopWatch from "./components/StopWatch/stopWatch";
import HomePage from "./components/HomePage/homePage";

export default function App() {
  // return <Accordian />;
  // return <Chess />;
  // return <Chips />;
  // return <Pagination />;
  // return <Projects />;
  // return <InfinateScroll />;
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Projects}>
          <Route index Component={HomePage} />
          <Route path="/accordian" Component={Accordian} />
          <Route path="/chessboard" Component={Chess} />
          <Route path="/input-chips" Component={Chips} />
          <Route path="/pagination" Component={Pagination} />
          <Route path="/infinate-scroll" Component={InfinateScroll} />
          <Route path="/auto-complete-search" Component={AutoCompleteSearch} />
          <Route path="/transfer-list" Component={TransferList} />
          <Route path="/progress-bar" Component={ProgressBar} />
          <Route path="/stop-watch" Component={StopWatch} />
        </Route>
      </Routes>
    </Router>
  );
}
