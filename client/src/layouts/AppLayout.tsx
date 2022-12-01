import React from 'react'
import Head from 'next/head';
import { DynamicNav } from '../components/nav/DynamicNav'

interface LayoutProps {
    children: React.ReactNode;
  }
  
  export class AppLayout extends React.Component<LayoutProps> {
    constructor(props: LayoutProps) {
      super(props);
    }
    render() {
      return (
        <>
          <Head>
            <title>Games.Next</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0,  minimum-scale=1.0"
            />
            <meta
              name="description"
              content="Play games vs friends"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="flex h-full flex-col">
            <DynamicNav />
            <main className="flex-1">{this.props.children}</main>
          </div>
        </>
      );
    }
  }