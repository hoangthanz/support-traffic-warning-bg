using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Support.Warning.Traffic.BorderGuard.Models.Business;

namespace Support.Warning.Traffic.BorderGuard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GateLevelsController : ControllerBase
    {
        private readonly SupportWarningContext _context;

        public GateLevelsController(SupportWarningContext context)
        {
            _context = context;
        }

        // GET: api/GateLevels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GateLevel>>> GetGateLevels()
        {
            return await _context.GateLevels.ToListAsync();
        }

        // GET: api/GateLevels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GateLevel>> GetGateLevel(int id)
        {
            var gateLevel = await _context.GateLevels.FindAsync(id);

            if (gateLevel == null)
            {
                return NotFound();
            }

            return gateLevel;
        }

        // PUT: api/GateLevels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGateLevel(int id, GateLevel gateLevel)
        {
            if (id != gateLevel.Id)
            {
                return BadRequest();
            }

            _context.Entry(gateLevel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GateLevelExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // POST: api/GateLevels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GateLevel>> PostGateLevel(GateLevel gateLevel)
        {
            _context.GateLevels.Add(gateLevel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGateLevel", new { id = gateLevel.Id }, gateLevel);
        }

        // DELETE: api/GateLevels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGateLevel(int id)
        {
            var gateLevel = await _context.GateLevels.FindAsync(id);
            if (gateLevel == null)
            {
                return NotFound();
            }

            _context.GateLevels.Remove(gateLevel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GateLevelExists(int id)
        {
            return _context.GateLevels.Any(e => e.Id == id);
        }
    }
}
