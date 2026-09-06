import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from '@samkhya/db';
const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'dev-secret-change-me');
export type SessionClaims={sub:string;email:string;platformRole?:string|null};
export async function issueSession(user:{id:string,email:string,platformRole?:string|null}){
  const token=await new SignJWT({email:user.email,platformRole:user.platformRole}).setProtectedHeader({alg:'HS256'}).setSubject(user.id).setIssuedAt().setExpirationTime('7d').sign(secret);
  const jar=await cookies();jar.set('sa_session',token,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:60*60*24*7});
}
export async function clearSession(){const jar=await cookies();jar.set('sa_session','',{path:'/',maxAge:0})}
export async function getSession():Promise<SessionClaims|null>{try{const jar=await cookies();const token=jar.get('sa_session')?.value;if(!token)return null;const {payload}=await jwtVerify(token,secret);return {sub:String(payload.sub),email:String(payload.email),platformRole:(payload.platformRole as string|null)||null}}catch{return null}}
export async function requireUser(){const s=await getSession();if(!s)throw new Error('UNAUTHORIZED');const user=await prisma.user.findUnique({where:{id:s.sub},include:{memberships:{include:{organization:true}}}});if(!user)throw new Error('UNAUTHORIZED');return user}
export async function requirePlatformAdmin(){const u=await requireUser();if(u.platformRole!=='PLATFORM_ADMIN')throw new Error('FORBIDDEN');return u}

export async function requireContentManager(){
  const u=await requireUser();
  if(!['PLATFORM_ADMIN','CONTENT_ADMIN'].includes(String(u.platformRole))) throw new Error('FORBIDDEN');
  return u;
}

export async function requireOrganizationAdmin(organizationId:string){
  const u=await requireUser();
  if(u.platformRole==='PLATFORM_ADMIN') return u;
  const membership=u.memberships.find((m:any)=>m.organizationId===organizationId && ['ORG_OWNER','ORG_ADMIN'].includes(String(m.role)));
  if(!membership) throw new Error('FORBIDDEN');
  return u;
}

export async function requireCrmUser(){
  const u=await requireUser();
  if(!['PLATFORM_ADMIN','SALES_COUNSELLOR'].includes(String(u.platformRole))) throw new Error('FORBIDDEN');
  return u;
}
