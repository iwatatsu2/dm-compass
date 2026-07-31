import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import InstallBanner from "./components/InstallBanner";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CalcPage from "./pages/CalcPage";
import GuidePageEnhanced from "./pages/GuidePageEnhanced";
import LovableHome from "./pages/LovableHome";

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <InstallBanner />
          <Router hook={useHashLocation}>
            <Switch>
              <Route path="/" component={LovableHome} />
              <Route path="/calc" component={CalcPage} />
              <Route path="/guide" component={GuidePageEnhanced} />
              <Route path="/classic" component={Home} />
              <Route path="/404" component={NotFound} />
              {/* Final fallback route */}
              <Route component={NotFound} />
            </Switch>
          </Router>
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
