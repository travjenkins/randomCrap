#based on http://blog.sarathonline.com/2012/05/eclipse-indigo-without-mylyn.html
cd /Applications/Eclipse.app/Contents/Eclipse/
mkdir disabled disabled/features disabled/plugins

mv features/*egit* disabled/features/
mv plugins/*egit* disabled/plugins/

mv features/*jgit* disabled/features/
mv plugins/*jgit* disabled/plugins/

mv features/*mylyn* disabled/features/
mv plugins/*mylyn* disabled/plugins/