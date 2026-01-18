// Get all DOM elements
const imageUpload = document.getElementById('imageUpload');
const cardText = document.getElementById('cardText');
const fontSize = document.getElementById('fontSize');
const fontSizeValue = document.getElementById('fontSizeValue');
const textColor = document.getElementById('textColor');
const fontFamily = document.getElementById('fontFamily');
const textPosition = document.getElementById('textPosition');
const backgroundColor = document.getElementById('backgroundColor');
const downloadBtn = document.getElementById('downloadBtn');
const cardMessage = document.getElementById('cardMessage');
const cardContent = document.getElementById('cardContent');
const cardPreview = document.getElementById('cardPreview');
const occasionSelect = document.getElementById('occasion');
const themeSelect = document.getElementById('theme');

// Occasion messages
const occasionMessages = {
    custom: '',
    birthday: 'Happy Birthday!\n\nWishing you a day filled with happiness and a year filled with joy. May all your dreams come true!',
    anniversary: 'Happy Anniversary!\n\nCelebrating the beautiful journey of love and togetherness. Here\'s to many more years of happiness!',
    wedding: 'Congratulations on Your Wedding!\n\nMay your marriage be filled with love, laughter, and endless happiness. Wishing you a lifetime of joy together!',
    christmas: 'Merry Christmas!\n\nMay this festive season bring you joy, peace, and happiness. Wishing you and your loved ones a wonderful holiday!',
    newyear: 'Happy New Year!\n\nMay the new year bring you new opportunities, new adventures, and endless possibilities. Cheers to a wonderful year ahead!',
    valentine: 'Happy Valentine\'s Day!\n\nSending you lots of love and warm wishes. May your day be filled with romance and happiness!',
    graduation: 'Congratulations on Your Graduation!\n\nYour hard work and dedication have paid off. Wishing you success in all your future endeavors!',
    thankyou: 'Thank You!\n\nYour kindness and generosity mean the world to me. I am truly grateful for everything you\'ve done.',
    congratulations: 'Congratulations!\n\nYour achievements inspire us all. Keep reaching for the stars and never stop believing in yourself!',
    getwell: 'Get Well Soon!\n\nWishing you a speedy recovery and sending you lots of love and positive energy. Take care and rest well!',
    mothersday: 'Happy Mother\'s Day!\n\nThank you for your endless love, care, and sacrifices. You mean the world to me. I love you!',
    fathersday: 'Happy Father\'s Day!\n\nThank you for being an amazing father and for all the love and guidance you\'ve given me. I appreciate you!'
};

// Theme configurations
const themeConfigs = {
    'custom': {
        bgColor: '#4a90e2',
        textColor: '#ffffff',
        gradient: null
    },
    'birthday-theme': {
        bgColor: '#ff6b6b',
        textColor: '#ffffff',
        gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffa500 50%, #ffd700 100%)'
    },
    'romantic': {
        bgColor: '#ff9a9e',
        textColor: '#ffffff',
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)'
    },
    'elegant': {
        bgColor: '#667eea',
        textColor: '#ffffff',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    'festive': {
        bgColor: '#f093fb',
        textColor: '#ffffff',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    'nature': {
        bgColor: '#4facfe',
        textColor: '#ffffff',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)'
    },
    'ocean': {
        bgColor: '#667eea',
        textColor: '#ffffff',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #4facfe 100%)'
    },
    'sunset': {
        bgColor: '#fa709a',
        textColor: '#ffffff',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    'forest': {
        bgColor: '#134e5e',
        textColor: '#ffffff',
        gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)'
    },
    'pastel': {
        bgColor: '#ffecd2',
        textColor: '#333333',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    'vintage': {
        bgColor: '#d4af37',
        textColor: '#ffffff',
        gradient: 'linear-gradient(135deg, #d4af37 0%, #8b6914 100%)'
    }
};

// Update font size display
fontSize.addEventListener('input', () => {
    fontSizeValue.textContent = fontSize.value + 'px';
    updateCard();
});

// Occasion to theme mapping
const occasionThemeMap = {
    birthday: 'birthday-theme',
    anniversary: 'romantic',
    wedding: 'elegant',
    christmas: 'festive',
    newyear: 'festive',
    valentine: 'romantic',
    graduation: 'elegant',
    thankyou: 'pastel',
    congratulations: 'festive',
    getwell: 'nature',
    mothersday: 'pastel',
    fathersday: 'elegant'
};

// Handle occasion selection
occasionSelect.addEventListener('change', (e) => {
    const occasion = e.target.value;
    if (occasionMessages[occasion]) {
        cardText.value = occasionMessages[occasion];
        
        // Auto-select matching theme
        if (occasion !== 'custom' && occasionThemeMap[occasion]) {
            themeSelect.value = occasionThemeMap[occasion];
            applyTheme(occasionThemeMap[occasion]);
        }
        
        updateCard();
    }
});

// Handle theme selection
themeSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
    updateCard();
});

// Apply theme
function applyTheme(themeName) {
    const theme = themeConfigs[themeName];
    if (!theme) return;
    
    // Remove all theme classes
    cardContent.classList.remove(...Object.keys(themeConfigs).filter(key => key !== 'custom').map(key => `theme-${key}`));
    
    if (themeName !== 'custom') {
        // Apply theme class
        cardContent.classList.add(`theme-${themeName}`);
        
        // Apply gradient if no custom image
        if (!cardContent.style.backgroundImage || cardContent.style.backgroundImage === 'none') {
            if (theme.gradient) {
                cardContent.style.background = theme.gradient;
            } else {
                cardContent.style.background = theme.bgColor;
            }
            cardPreview.style.backgroundColor = theme.bgColor;
        }
        
        // Update text color
        textColor.value = theme.textColor;
        cardMessage.style.color = theme.textColor;
        
        // Update background color picker
        backgroundColor.value = theme.bgColor;
    }
}

// Handle image upload
imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            cardContent.style.backgroundImage = `url(${event.target.result})`;
            cardContent.style.backgroundColor = 'transparent';
            // Remove theme gradient when image is uploaded
            const currentTheme = themeSelect.value;
            if (currentTheme !== 'custom') {
                cardContent.style.background = `url(${event.target.result})`;
                cardContent.style.backgroundSize = 'cover';
                cardContent.style.backgroundPosition = 'center';
                cardContent.style.backgroundRepeat = 'no-repeat';
            }
            updateCard();
        };
        reader.readAsDataURL(file);
    }
});

// Add button to clear image
const clearImageBtn = document.createElement('button');
clearImageBtn.textContent = '🗑️ Clear Image';
clearImageBtn.className = 'clear-image-btn';
clearImageBtn.style.cssText = 'width: 100%; padding: 8px; margin-top: 5px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 0.9em;';
clearImageBtn.addEventListener('click', () => {
    imageUpload.value = '';
    cardContent.style.backgroundImage = 'none';
    applyTheme(themeSelect.value);
    updateCard();
});
imageUpload.parentElement.appendChild(clearImageBtn);

// Update card when any control changes
cardText.addEventListener('input', updateCard);
textColor.addEventListener('input', updateCard);
fontFamily.addEventListener('change', updateCard);
textPosition.addEventListener('change', updateCard);
backgroundColor.addEventListener('input', () => {
    if (themeSelect.value === 'custom' || !cardContent.style.backgroundImage || cardContent.style.backgroundImage === 'none') {
        cardPreview.style.backgroundColor = backgroundColor.value;
        if (!cardContent.style.backgroundImage || cardContent.style.backgroundImage === 'none') {
            cardContent.style.background = backgroundColor.value;
        }
    }
    updateCard();
});

// Update card preview
function updateCard() {
    // Update message text
    cardMessage.textContent = cardText.value || 'Your Message Here';
    
    // Update font size
    cardMessage.style.fontSize = fontSize.value + 'px';
    
    // Update text color
    cardMessage.style.color = textColor.value;
    
    // Update font family
    cardMessage.style.fontFamily = fontFamily.value;
    
    // Update text position
    cardContent.style.alignItems = textPosition.value === 'top' ? 'flex-start' : 
                                   textPosition.value === 'bottom' ? 'flex-end' : 'center';
    
    // Update background color (only if no image is set and custom theme)
    if ((!cardContent.style.backgroundImage || cardContent.style.backgroundImage === 'none') && themeSelect.value === 'custom') {
        cardPreview.style.backgroundColor = backgroundColor.value;
    }
}

// Download card as image
downloadBtn.addEventListener('click', async () => {
    try {
        // Show loading state
        downloadBtn.textContent = '⏳ Generating...';
        downloadBtn.disabled = true;
        
        // Use html2canvas to capture the card
        const canvas = await html2canvas(cardPreview, {
            backgroundColor: null,
            scale: 2, // Higher quality
            logging: false,
            useCORS: true
        });
        
        // Convert canvas to blob and download
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `greeting-card-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            // Reset button
            downloadBtn.textContent = '📥 Download Card';
            downloadBtn.disabled = false;
        }, 'image/png');
    } catch (error) {
        console.error('Error generating card:', error);
        alert('Error generating card. Please try again.');
        downloadBtn.textContent = '📥 Download Card';
        downloadBtn.disabled = false;
    }
});

// Initialize card on load
updateCard();

