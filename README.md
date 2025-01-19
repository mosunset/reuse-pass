# ReUse Pass

**ReUse Pass** は、ユーザーが不要品を取引し、再利用を促進するためのプラットフォームです。あなたの不要品が誰かの宝物になるように、簡単にアイテムの出品・購入が可能です。

## 特徴

- **ユーザー認証**
  Supabase を利用したサインアップ、ログイン、サインアウト機能。

- **商品検索・詳細表示**
  商品を検索し、詳細情報や画像を確認できるページを提供。

- **商品出品**
  ユーザーは商品を出品し、画像や説明、受け渡し場所などを入力可能。

- **購入・購入履歴**
  商品を購入し、その後のチャットや履歴を管理する機能。

- **マイページ**
  プロフィール変更、出品物一覧、購入履歴などの管理が可能。

- **レスポンシブデザイン**
  各種デバイスで快適に利用できるモダンなUI。

## 使用技術

- **[Next.js 14](https://nextjs.org/)**
  App Routerを活用した最新のReactフレームワーク。

- **[Supabase](https://supabase.com/)**
  認証、ストレージ、データベース管理を提供。

- **[Prisma](https://www.prisma.io/)**
  型安全なデータベースクライアント。

- **React Hook Form & Zod**
  フォームのバリデーションと管理。

- **Tailwind CSS**
  効率的なスタイリング。

- その他、Lucide Icons、date-fns など多数のライブラリを使用。

## 使い方

1. **ユーザー登録・ログイン**
   ホームページからサインアップまたはログインを行います。

2. **商品検索**
   検索バーを使用して出品されている商品を探します。検索結果から商品詳細ページにアクセスできます。

3. **商品出品**
   「出品」ページから商品名、説明、画像、受け渡し場所などを入力して商品を出品します。

4. **商品購入**
   商品詳細ページで「購入」ボタンを押して購入手続きを行います。購入後はチャット機能で出品者と連絡を取ることができます。

5. **マイページ管理**
   マイページでプロフィールの変更、出品物の一覧確認、購入履歴の確認、サインアウトなどを行います。

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
