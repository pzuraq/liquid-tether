module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addAddonToProject({
      name: 'liquid-fire',
      version: '0.33.0'
    });
  }
};
