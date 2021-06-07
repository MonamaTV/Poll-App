import './App.css';
import Body from './components/Body';
import CreatePoll from './components/Pages/CreatePoll';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//My custom components
import Nav from './components/Nav';
import Vote from './components/Pages/Vote';
import Polls from './components/Pages/Polls';
import Results from './components/Pages/Results';
import { EmailProvider } from './context/EmailContext';
import { useState, useEffect, useContext } from 'react';
import Loading from './components/Loading';
import { ThemeContext } from './context/ThemeContext';

const App = () => {

    const [darkTheme, setDarkTheme, globalTheme] = useContext(ThemeContext);

    useEffect(() => {
        
        setLoading(true);
        
        const darkThemeValue = localStorage.getItem("polltheme") || "false";

        setDarkTheme(() => {
            if(darkThemeValue === "false")
                return false;
            else return true;
        });
        
        setLoading(false);
        
    }, [setDarkTheme]);


    const [loading, setLoading] = useState(false);

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
        localStorage.setItem("polltheme", !darkTheme);
    }
    
    return (
        !loading ? <EmailProvider>
        <Router> 
            <Nav
                darkTheme={darkTheme}
                toggleTheme={toggleTheme}
                theme={globalTheme}
            />
            <div style={globalTheme} className="home">
                <Switch>
                    <Route path="/home" exact>
                        <Body/>
                    </Route>
                    <Route path="/start" exact>
                        <CreatePoll />
                    </Route>
                    <Route path="/results/:id" exact>
                        <Results />
                    </Route>
                    <Route path="/poll/:id" exact>
                        <Vote />
                    </Route>
                    <Route path="/polls" exact>
                        <Polls />
                    </Route>
                    <Route path="/" exact>
                        <Body />
                    </Route>
                </Switch>
            </div>
        </Router>
    </EmailProvider> : <Loading />
    )
};

export default App;
