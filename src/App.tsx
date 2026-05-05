import './App.css'
import { useWalletStore } from './store/WalletStore';
import { Login } from './components/Login';
import { ConnectApproval } from './components/ConnectApproval';
import { SignTransaction } from './components/SignTransaction';
import { WalletHome } from './components/WalletHome';
import { SignMessage } from './components/SignMessage';
import { SetUpWallet } from './components/SetUpWallet';
function App() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const bIsWalletConfigured = useWalletStore((s) => s.hasWallet);
  const bIsAuthenticated = useWalletStore((s) => s.bIsAuthenticated);
  if(bIsWalletConfigured == false) return <SetUpWallet/>
  // 🔐 Step 1: Always gate with login
  if (bIsAuthenticated == false) return <Login />;

  // 🔁 Step 2: Handle different flows
  switch (mode) {
    case "connect":
      return <ConnectApproval />;

    case "sign":
      return <SignTransaction />;

    case "message":
      return <SignMessage />;

    default:
      return <WalletHome />;
  }
  return (
    <>
      
    </>
  )
}

export default App
