import { db } from '@/lib/db';

export interface CreateUserProps {
    userid: string;
    name?: string;
    bio?: string;
    icon?: string;
}

export const createUser = async ({
    userid,
    name,
    bio,
    icon,
}: CreateUserProps) => {
    try {
        const user = await db.user.create({
            data: {
                userid,
                name: name || '無名のユーザ',
                bio: bio || 'よろしくお願いします',
                icon: icon || '/KUT_logo.gif',
            },
        });
        return user;
    } catch (error) {
        throw new Error(`ユーザー作成中にエラーが発生しました: ${error}`);
    }
};
