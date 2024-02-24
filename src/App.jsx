import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Navbar from "./components/Navbar/Navbar";
import {AuthContextProvider} from "./context/AuthContext";
import Cities from "./components/Cities/Cities";
import Search from "./components/Search/Search";

const queryClient = new QueryClient();

export default function App() {
    return (
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <Navbar />
                <Search />
                <Cities />
            </QueryClientProvider>
        </AuthContextProvider>
    );
}
