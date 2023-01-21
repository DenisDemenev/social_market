import Header from './Header/Header';

const Layout = ({ children }) => {
  return (
    <>
      <div className="container mx-auto">
        <Header>{children}</Header>
      </div>
    </>
  );
};

export default Layout;
