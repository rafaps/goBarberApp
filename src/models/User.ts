import { Entity, Column, PrimaryColumn, UpdateDateColumn, CreateDateColumn} from 'typeorm';

@Entity('users')
class User {

    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    password: string

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;