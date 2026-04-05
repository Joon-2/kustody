function handleSignup(btn) {
  var input = document.querySelector('.email-input');
  if (!input.value || !input.value.includes('@')) {
    input.style.borderColor = 'rgba(229,75,75,0.5)';
    input.placeholder = document.documentElement.lang === 'ko'
      ? '\uc720\ud6a8\ud55c \uc774\uba54\uc77c\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694'
      : document.documentElement.lang === 'ja'
      ? '\u6709\u52b9\u306a\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044'
      : 'Please enter a valid email';
    return;
  }
  btn.textContent = btn.getAttribute('data-success') || 'Signed up \u2713';
  btn.style.background = '#5de0a0';
  btn.style.color = '#004f93';
  btn.disabled = true;
  input.disabled = true;
  input.style.opacity = '0.5';
  document.getElementById('signup-msg').style.display = 'block';
}
