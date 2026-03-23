# Quick Accessibility Testing Guide

This guide provides step-by-step instructions to test and validate the accessibility improvements made to the GYM X website.

---

## Quick Tests (5 Minutes)

### Test 1: Keyboard Navigation
**Duration:** 2 minutes

1. **Open the website** in any browser
2. **Press `Tab` key** repeatedly
3. **Verify:** You can reach and activate all interactive elements
   - Skip link appears
   - Navigation links
   - Buttons
   - Form fields
   - All clickable elements

**Expected Elements in Tab Order:**
- Skip Link → Navbar Links → Hero Button → Join Now Buttons → Contact Form → Close Button → Social Links

**✅ Pass if:** You can tab through all elements and the focus indicator (pink outline) is visible on each.

---

### Test 2: Focus Visibility
**Duration:** 1 minute

1. **Tab through the page** (press `Tab`)
2. **Look for the focus indicator** - a pink/yellow outline around each element
3. **Check contrast** - the outline should be clearly visible

**✅ Pass if:** Every focusable element has a visible outline.

---

### Test 3: Form Labels
**Duration:** 2 minutes

1. **Scroll to the Contact Form**
2. **Verify each field has a label:**
   - "Name *"
   - "Email *"
   - "Message *"
3. **Leave a field empty** and try to submit
4. **Check error message** appears and is red

**✅ Pass if:** All fields have labels and error messages are clear.

---

## Deep Dive Tests (15 Minutes)

### Test 4: Modal Accessibility (QR Popup)
**Duration:** 3 minutes

1. **Click "Join Now" button** (on any membership card)
2. **Modal appears**
3. **Press `Tab`** - Focus should stay within the modal
4. **Press `Escape`** - Modal should close
5. **Focus returns** to the "Join Now" button you clicked

**✅ Pass if:** Focus is trapped in modal, Escape closes it, and focus is restored.

---

### Test 5: Mobile Menu
**Duration:** 2 minutes

1. **Resize browser to mobile width** (< 768px or use mobile device)
2. **Tab to hamburger menu button**
3. **Verify button label** includes "Open navigation menu"
4. **Press `Enter`** - Menu should open/close
5. **Tab through menu items**
6. **Press `Escape`** - Menu should close

**✅ Pass if:** Menu is fully keyboard accessible on mobile.

---

### Test 6: Screen Reader Testing (NVDA - Windows)
**Duration:** 10 minutes

**Setup:**
1. Download NVDA: https://www.nvaccess.org/download/
2. Install and launch NVDA
3. Open the website

**Test Steps:**
1. **NVDA should announce:** "Navigation region, Main navigation"
2. **Move through page** with Arrow keys
3. **Listen for announcements:**
   - Page title
   - Sections (Hero, About, Classes, etc.)
   - Forms and fields
   - Buttons
   - Images and alt text

**Expected Announcements:**
- "Skip to main content, link"
- "Main navigation, navigation region"
- "Unleash Your Power, heading 1"
- "Contact Us heading 2"
- "Name, required, edit text"
- "Join Now, button"

**✅ Pass if:** All content is announced clearly and no element is skipped.

---

## Advanced Tests (20 Minutes)

### Test 7: Axe DevTools (Chrome/Firefox/Edge)
**Duration:** 5 minutes

**Setup:**
1. Install Axe DevTools: https://www.deque.com/axe/devtools/
2. Open website

**Test Steps:**
1. **Click Axe DevTools icon**
2. **Click "Scan ALL of my page"**
3. **Review results**

**Expected Result:**
- ✅ 0 Critical issues
- ✅ 0 Serious issues
- ✅ Warnings may exist (review, don't block)

**If Issues Found:**
- Document the issue
- Screenshot
- Report location on page

---

### Test 8: Image Alt Text
**Duration:** 5 minutes

1. **Right-click each image** on the page
2. **Select "Inspect"** (or Inspect Element)
3. **Look for `alt` attribute**
4. **Verify alt text is:**
   - ✅ Descriptive (not just "image" or "photo")
   - ✅ Relevant to content
   - ✅ Not redundant with surrounding text

**Example Good Alt Text:**
- "Gym members training and working out"
- "Group fitness class in session"
- "Professional fitness trainers posing"

**❌ Bad Alt Text:**
- "image"
- "photo"
- ""
- "gym"

---

### Test 9: Heading Hierarchy
**Duration:** 5 minutes

1. **Install extension:** Headings Map or WAVE
   - Chrome: https://chrome.google.com/webstore/
   - Firefox: https://addons.mozilla.org/
2. **Scan page**
3. **Review heading structure**

**Expected Hierarchy:**
```
H1: Unleash Your Power
  H2: About Our Gym
  H2: Classes & Programs
  H2: Meet Our Trainers
  H2: Gallery
  H2: Our Facilities
    H3: Cardio Zone
    H3: Free Weights
    H3: Sauna
    H3: Locker Rooms
  H2: Membership Plans
    H3: Basic
    H3: Premium
    H3: VIP
  H2: FAQ
  H2: Testimonials
  H2: Contact Us
```

**✅ Pass if:** Only one H1, proper nesting, no skipped levels.

---

### Test 10: Contrast Ratio
**Duration:** 5 minutes

1. **Use:** WebAIM Contrast Checker
   - https://webaim.org/resources/contrastchecker/
2. **Test these text/background combinations:**
   - White text on black
   - Yellow text on black
   - Pink text on black
   - Focus outline on all backgrounds

3. **Input values** into the tool
4. **Check ratios**

**Expected WCAG AA Minimums:**
- Normal text: 4.5:1
- Large text (18pt+): 3:1

**✅ Pass if:** All ratios meet or exceed 4.5:1.

---

## Browser-Specific Tests

### Chrome/Chromium

```
1. DevTools → Lighthouse
2. Tab "Accessibility"
3. Click "Analyze page load"
4. Check for issues
```

**Expected:** Mostly green, no critical issues.

---

### Firefox

```
1. Developer Tools → Inspector
2. Accessibility tab
3. Review tree
4. Check for violations
```

**Expected:** No red violations.

---

### Safari

```
1. Preferences → Advanced
2. Enable "Show Develop menu"
3. Develop → Accessibility Audit
4. Review results
```

**Expected:** No failures.

---

## Mobile Testing

### iOS (VoiceOver)

1. **Settings → Accessibility → VoiceOver**
2. **Enable VoiceOver**
3. **Swipe right** to move forward
4. **Swipe left** with two fingers to go back
5. **Double-tap** to activate
6. **Two-finger scrub** (Z motion) for context menu

---

### Android (TalkBack)

1. **Settings → Accessibility → TalkBack**
2. **Enable TalkBack**
3. **Swipe right** to move forward
4. **Swipe left** to move back
5. **Double-tap** to activate
6. **Right-swipe with 2 fingers** for local context menu

---

## Common Issues & Fixes

### Issue: Focus indicator not visible
**Solution:** Check if CSS is overriding focus styles
```css
/* Make sure this is imported */
@import "./accessibility.css";
```

### Issue: Form field not labeled
**Solution:** Use proper label element:
```jsx
<label htmlFor="field-id">Label Text</label>
<input id="field-id" />
```

### Issue: Screen reader not announcing updates
**Solution:** Add aria-live region:
```jsx
<div aria-live="polite" role="alert">
  {statusMessage}
</div>
```

### Issue: Modal not trappable
**Solution:** Ensure modal has focus trapping:
```jsx
// See QRPopup.jsx for implementation
```

---

## Testing Checklist

Use this checklist to track completed tests:

### Essential Tests (~5 min)
- [ ] Tab through entire page
- [ ] Focus visible on all elements  
- [ ] Form has labels
- [ ] Error messages appear

### Recommended Tests (~20 min)
- [ ] Keyboard-only navigation
- [ ] Mobile menu keyboard accessible
- [ ] Modal focus trapping works
- [ ] Run Axe DevTools scan
- [ ] Test with NVDA (Windows) or VoiceOver (Mac)

### Comprehensive Tests (~40 min)
- [ ] All of above
- [ ] Check image alt text
- [ ] Verify heading hierarchy
- [ ] Test contrast ratios
- [ ] Test on multiple browsers
- [ ] Test on mobile (iOS/Android)
- [ ] Listen for screen reader announcements
- [ ] Escape key closes all modals
- [ ] Skip link works

---

## Performance Notes

Accessibility improvements are lightweight:
- ✅ No performance impact
- ✅ CSS file is small (6KB)
- ✅ No JavaScript overhead
- ✅ Animations respect `prefers-reduced-motion`

---

## Reporting Accessibility Issues

If you find an accessibility issue:

1. **Document it:**
   - Page section
   - Browser/device
   - Issue description
   - Expected behavior

2. **Provide evidence:**
   - Screenshot
   - Browser console errors
   - Screen reader output

3. **Reference WCAG:**
   - Which criterion failed
   - Specific line from spec

**Example Report:**
```
Issue: Contact form submit button not focusable
Location: Contact Us section
Browser: Chrome 120
Expected: Button should have visible focus outline
Actual: Button has no focus outline
WCAG: 2.4.7 Focus Visible
```

---

## Additional Resources

- **WCAG 2.2:** https://www.w3.org/WAI/WCAG22/quickref/
- **Axe DevTools:** https://www.deque.com/axe/devtools/
- **NVDA:** https://www.nvaccess.org/
- **WebAIM:** https://webaim.org/
- **MDN Accessibility:** https://developer.mozilla.org/en-US/docs/Web/Accessibility

---

## Support

For help with accessibility testing:
1. Review `ACCESSIBILITY_GUIDE.md`
2. Check component source code
3. Reference WCAG 2.2 specifications
4. Test with browser dev tools

---

**Status:** ✅ Ready for Testing  
**Last Updated:** March 2026

