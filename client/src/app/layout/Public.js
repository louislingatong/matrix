import React from 'react';
import Header from '../components/common/header/Header';
import Footer from '../components/common/footer/Footer';

function PublicLayout({children, ...rest}) {
  return (
    <React.Fragment>
      <Header {...rest}/>
      <div className="main-wrapper">
        <main>
          {children}
        </main>
      </div>
      <Footer/>
    </React.Fragment>
  );
}

export default PublicLayout;
