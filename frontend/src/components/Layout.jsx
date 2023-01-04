import Header from './Header.jsx/Header';

export const Layout = ({ children }) => {
  return (
    <>
      <div className="container mx-auto">
        <Header>{children}</Header>
      </div>
    </>
  );
};
