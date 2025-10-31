# 💍 Zeyad & Rawan - Engagement Invitation Website

A sophisticated, elegant, and emotionally engaging single-page wedding/engagement invitation website designed to feel like opening a luxurious physical invitation.

## 🎨 Design Philosophy

This website combines minimalist elegance with interactive storytelling to create a memorable digital invitation experience. The design focuses on:
- Beautiful typography and subtle animations
- Warm, sophisticated color palette
- Mobile-first responsive design
- Smooth, luxurious user interactions

## 🌈 Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Soft Off-White | `#FDFBF8` | Primary Background |
| Accent Beige | `#F1EBE4` | Section Backgrounds |
| Dark Brown-Gray | `#4E4842` | Primary Text |
| Elegant Gold | `#B08D57` | Accents, Names, Dates |
| Muted Olive Green | `#7A8A74` | Floral Elements |
| Dusty Rose Pink | `#D8C1C3` | Floral Accents |
| Envelope Beige | `#EADBC8` | Envelope Design |

## ✨ Current Features

### 1. **Interactive Envelope Opening Animation** ✅
- Full-screen animated envelope with 3D-style graphics
- Clickable envelope that opens with smooth animations
- Wax seal with couple's initials (Z&R)
- Elegant reveal transition to main invitation

### 2. **Hero Invitation Card** ✅
- Beautiful typography showcasing couple names
- "Save the Date" announcement
- Sequenced fade-in animations for all elements
- Scroll indicator guiding users through the page

### 3. **Event Details Section** ✅
- Arabic "Bismillah" in elegant typography
- Full event information:
  - **Date:** Friday, November 7, 2025
  - **Time:** 7:00 PM
  - **Venue:** Diva Garden Hall, Talkha City
- Large, prominent date display in accent gold
- Decorative floral corner elements

### 4. **Interactive Google Maps** ✅
- Embedded Google Maps showing venue location
- Custom styled map matching website aesthetic
- "Get Directions" button opening native maps app
- Responsive map display on all devices

### 5. **Live Countdown Timer** ✅
- Dynamic countdown to November 7, 2025, 7:00 PM
- Four display boxes: Days, Hours, Minutes, Seconds
- Smooth flip animation when numbers change
- Automatically updates every second
- Responsive grid layout (2x2 on mobile, 4x1 on desktop)

### 6. **Digital Guestbook Canvas** ✅
- Interactive drawing canvas for guest messages
- Features:
  - **Color Palette:** Black, Red, Blue, Green, Orange, Gold
  - **Pen Width Options:** Thin, Medium, Thick
  - **Guest Name Input Field**
  - **Action Buttons:** Undo, Clear, Send Message
- Touch-enabled for mobile drawing
- Saves drawings as base64 images to database
- Success/error feedback messages
- Canvas automatically adjusts to screen size

### 7. **Photo Upload Section** ✅
- QR code for quick camera access on mobile
- Alternative "Click to Upload" button
- Placeholder for integration with photo services
- Beautiful card design with clear instructions

### 8. **Smooth Scroll Animations** ✅
- Intersection Observer API for scroll reveals
- Elements fade in and slide up as they enter viewport
- Smooth scrolling between sections
- Performance-optimized animations

### 9. **Fully Responsive Design** ✅
- Mobile-first approach
- Optimized for all screen sizes:
  - Large desktops (1200px+)
  - Tablets (768px - 1199px)
  - Mobile phones (320px - 767px)
- Touch-optimized interactions
- Readable typography at all sizes

### 10. **Elegant Footer** ✅
- Couple names and wedding date
- Heart icon decoration
- Warm closing message
- Dark background for visual contrast

## 🗄️ Data Structure

### Guestbook Messages Table

**Table Name:** `guestbook_messages`

| Field | Type | Description |
|-------|------|-------------|
| `id` | text | Unique identifier (auto-generated) |
| `guest_name` | text | Name of the guest |
| `message_image` | text | Base64 encoded drawing/message |
| `created_date` | datetime | Timestamp of message creation |

## 📁 Project Structure

```
engagement-invitation/
├── index.html              # Main HTML file with all sections
├── css/
│   └── style.css          # Complete styling system
├── js/
│   └── main.js            # All interactive functionality
└── README.md              # This file
```

## 🚀 How to Use

### For Guests (Viewing the Invitation)

1. **Open the website** on any device
2. **Click the envelope** to reveal the invitation
3. **Scroll down** to explore all sections:
   - View event details
   - See the venue location
   - Watch the countdown timer
   - Leave a message in the guestbook
   - Upload photos (coming soon)

### For Administrators (Managing the Site)

1. **Customize Event Details:**
   - Edit `index.html` to update date, time, venue information
   - Modify the countdown date in `js/main.js` (CONFIG.eventDate)

2. **View Guestbook Messages:**
   - Access via API: `GET tables/guestbook_messages`
   - Messages include guest name, drawing, and timestamp

3. **Customize Google Maps:**
   - Replace the iframe `src` in the Location section with your venue's coordinates
   - Get embed code from Google Maps

## 🔧 Technical Implementation

### Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Advanced styling with CSS Variables, Grid, Flexbox
- **Vanilla JavaScript** - No frameworks, pure JS for performance
- **Google Fonts** - Playfair Display, Lato, Great Vibes, Amiri
- **Font Awesome** - Icon library
- **Canvas API** - Drawing functionality for guestbook
- **Intersection Observer API** - Scroll animations
- **RESTful Table API** - Data persistence

### Key Features Implementation

#### Envelope Animation
- CSS 3D transforms for flap rotation
- Sequential fade transitions between sections
- Click event triggering animation sequence

#### Countdown Timer
- JavaScript Date calculations
- SetInterval for real-time updates
- Flip animation using CSS keyframes
- Automatically handles past event dates

#### Canvas Guestbook
- Mouse and touch event handlers
- Path tracking with history for undo functionality
- Base64 image encoding for storage
- Responsive canvas sizing with aspect ratio preservation

#### Scroll Animations
- Intersection Observer for performance
- Threshold-based triggering
- Staggered animations with CSS delays

## 🎯 API Endpoints

### Guestbook Messages

**List Messages:**
```
GET tables/guestbook_messages?page=1&limit=100
```

**Get Single Message:**
```
GET tables/guestbook_messages/{id}
```

**Create Message:**
```
POST tables/guestbook_messages
Content-Type: application/json

{
  "guest_name": "John Doe",
  "message_image": "data:image/png;base64,...",
  "created_date": "2025-10-31T12:00:00Z"
}
```

**Delete Message:**
```
DELETE tables/guestbook_messages/{id}
```

## 📱 Browser Compatibility

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

## 🎨 Customization Guide

### Change Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --bg-primary: #FDFBF8;      /* Background */
    --accent-gold: #B08D57;      /* Gold accents */
    --text-primary: #4E4842;     /* Text color */
    /* ... more colors ... */
}
```

### Change Event Date

Edit `js/main.js`:

```javascript
const CONFIG = {
    eventDate: new Date('2025-11-07T19:00:00'),
    // Change to your event date and time
};
```

### Change Venue Location

Edit the Google Maps iframe in `index.html`:

1. Go to Google Maps
2. Find your venue
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the existing iframe in the Location section

### Add Background Video

Replace the placeholder video background in `css/style.css`:

```css
.video-background {
    background: url('path-to-your-video-poster.jpg') center/cover;
}
```

For actual video, add a `<video>` tag in `index.html`:

```html
<div class="video-background">
    <video autoplay muted loop playsinline>
        <source src="your-video.mp4" type="video/mp4">
    </video>
    <div class="video-overlay"></div>
</div>
```

## 🔮 Planned Features & Enhancements

### Not Yet Implemented

1. **Photo Upload Integration**
   - Connect to actual photo hosting service
   - QR code generation for specific upload link
   - Photo gallery display page

2. **Background Video**
   - Placeholder background ready for video integration
   - Black and white filter effect
   - Optimized video loading and playback

3. **RSVP Form**
   - Guest RSVP tracking
   - Meal preferences
   - Plus-one management

4. **Admin Dashboard**
   - View all guestbook messages
   - Manage guest list
   - Download guest drawings

5. **Multi-language Support**
   - Arabic language toggle
   - RTL layout support
   - Bilingual content

6. **Additional Sections**
   - Story of how couple met
   - Photo gallery carousel
   - Gift registry links
   - Travel/accommodation information

## 🚀 Deployment

To deploy your invitation website, go to the **Publish tab** where you can publish your project with one click. The Publish tab will handle all deployment processes automatically and provide you with the live website URL.

## 📊 Performance

- Optimized images and assets
- Minimal JavaScript bundle
- CSS optimized for critical rendering path
- Lazy loading for below-fold content
- Mobile-first responsive design
- Touch-optimized interactions

## 🎭 Credits & Acknowledgments

**Design & Development:** Created for Zeyad & Rawan's engagement celebration

**Typography:**
- Playfair Display (Headings)
- Lato (Body text)
- Great Vibes (Script)
- Amiri (Arabic)

**Icons:** Font Awesome

**Special Features:**
- Interactive canvas drawing
- Live countdown timer
- Animated envelope reveal
- Smooth scroll animations

## 💌 Support & Questions

For customization help or technical questions, refer to the inline code comments in each file. The code is well-documented and organized for easy modification.

---

**Made with 💕 for Zeyad & Rawan**  
*November 7, 2025*

---

## 🎉 Final Notes

This invitation website is designed to create a memorable first impression for your special day. Every element has been carefully crafted to evoke emotion and excitement while maintaining elegant simplicity.

**Key Success Factors:**
- ✅ Beautiful, emotional design
- ✅ Smooth, luxurious interactions
- ✅ Mobile-optimized experience
- ✅ Easy to customize
- ✅ Database-backed guestbook
- ✅ Real-time countdown
- ✅ Fully functional and tested

Enjoy sharing this invitation with your loved ones! 💍✨
