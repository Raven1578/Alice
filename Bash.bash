/Alice
├── index.html
├── styles.css
├── script.js
├── Photos
│   ├── photo1.jfif
│   ├── photo2.jfif
│   ├── photo3.jpg
│   └── (other photos)
└── sounds
    ├── song1.mp3
    ├── song2.mp3
    ├── song3.mp3
    └── (other songs)


mkdir -p Alice


cd Alice

touch index.html styles.css script.js


mkdir -p Photos sounds


touch Photos/photo{1..20}.jfif Photos/photo{3,4,5,6,8,9,10,13,14,15,16,17,18,19}.jpg

touch sounds/song{1..20}.mp3

echo "Project structure created successfully!"

