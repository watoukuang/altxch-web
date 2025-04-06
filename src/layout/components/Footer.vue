<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2023 altxch.com. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
.footer {
  background: #172636; /* Dark background */
  color: #fff; /* White text */
  padding: 30px; /* Padding */
  text-align: center; /* Centered text */
}
.footer-content {
  max-width: 1200px; /* Max width for content */
  margin: 0 auto; /* Center the content */
}
.footer nav ul {
  list-style-type: none; /* Remove bullet points */
  padding: 0; /* Remove padding */
}
.footer nav ul li {
  display: inline; /* Inline list items */
  margin: 0 15px; /* Space between items */
}
.footer nav ul li a {
  color: #37ff00; /* Neon link color */
  text-decoration: none; /* Remove underline */
}
.footer nav ul li a:hover {
  text-decoration: underline; /* Underline on hover */
}
</style>