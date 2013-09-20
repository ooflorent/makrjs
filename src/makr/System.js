/**
 * A system that processes entities.
 *
 * @class System
 * @constructor
 */
makr.System = function() {
  /**
   * @private
   * @property {BitSet} _componentMask
   */
  this._componentMask = makr.config.MAX_COMPONENTS <= 32
    ? new makr.FastBitSet()
    : new makr.BitSet(makr.config.MAX_COMPONENTS);

  /**
   * @private
   * @property {Entity[]} _entities
   */
  this._entities = [];

  /**
   * @private
   * @property {World} _world
   */
  this._world = null;

  /**
   * @property {Boolean} enabled
   */
  this.enabled = true;
};

makr.System.prototype = {
  /**
   * @final
   * @method registerComponent
   * @param {Uint} type
   */
  registerComponent: function(type) {
    this._componentMask.set(type, 1);
  },
  /**
   * @final
   * @method update
   * @param {Float} elapsed
   */
  update: function(elapsed) {
    if (this.enabled) {
      this.onBegin();
      this.processEntities(this._entities, elapsed);
      this.onEnd();
    }
  },
  /**
   * @method processEntities
   * @param {Entity[]} entities
   * @param {Float} elapsed
   */
  processEntities: function(entities, elapsed) {},
  /**
   * @method onRegistered
   */
  onRegistered: function() {},
  /**
   * @method onBegin
   */
  onBegin: function() {},
  /**
   * Called after the end of processing.
   *
   * @method onEnd
   */
  onEnd: function() {},
  /**
   * Called when an entity is added to this system
   *
   * @method onAdded
   * @param {Entity} entity
   */
  onAdded: function(entity) {},
  /**
   * Called when an entity is removed from this system
   *
   * @method onRemoved
   * @param {Entity} entity
   */
  onRemoved: function(entity) {},
  /**
   * @private
   * @method _addEntity
   * @param {Entity} entity
   */
  _addEntity: function(entity) {
    var entities = this._entities;
    if (entities.indexOf(entity) < 0) {
      entities.push(entity);
      this.onAdded(entity);
    }
  },
  /**
   * @private
   * @method _removeEntity
   * @param {Entity} entity
   */
  _removeEntity: function(entity) {
    var entities = this._entities;
    var i = entities.indexOf(entity);
    if (i >= 0) {
      entities[i] = entities[entities.length - 1];
      entities.pop();
      this.onRemoved(entity);
    }
  }
};

/**
 * @property {Boolean} world
 */
Object.defineProperty(makr.System.prototype, 'world', {
  get: function() {
    return this._world;
  }
});
